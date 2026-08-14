<?php

namespace craftyfm\formbuilder\services;

use Craft;
use craft\base\Component;
use craft\errors\VolumeException;
use craft\helpers\Html;
use craft\helpers\UrlHelper;
use craftyfm\formbuilder\events\SubmissionEvent;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\jobs\IntegrationJob;
use craftyfm\formbuilder\jobs\SendNotificationJob;
use craftyfm\formbuilder\models\Form;
use craftyfm\formbuilder\models\form_fields\BaseInput;
use craftyfm\formbuilder\models\FormSettings;
use craftyfm\formbuilder\models\Submission;
use craftyfm\formbuilder\models\submission_fields\BaseField;
use craftyfm\formbuilder\models\submission_fields\FileUploadField;
use craftyfm\formbuilder\records\SubmissionRecord;
use DateTime;
use Throwable;
use yii\db\Exception;

class Submissions extends Component
{
    public const EVENT_BEFORE_SUBMISSION_SAVED = 'beforeSubmissionSaved';
    public const EVENT_AFTER_SUBMISSION_SAVED = 'afterSubmissionSaved';

    /** Always-rendered action column; never stored in the form's column settings. */
    private const COLUMN_VIEW = 'view';
    /**
     * Get submission by ID
     */
    public function getSubmissionById(int $id): ?Submission
    {
        $record = SubmissionRecord::findOne(['id' => $id]);
        
        if (!$record) {
            return null;
        }

        return $this->createSubmissionFromRecord($record);
    }

    /**
     * Get all submissions
     */
    public function getSubmissions(): array
    {
        $submissionRecords = SubmissionRecord::find()->all();
        $submissions = [];
        
        foreach ($submissionRecords as $submissionRecord) {
            $submission = $this->createSubmissionFromRecord($submissionRecord);
            if ($submission) {
                $submissions[] = $submission;
            }
        }
        
        return $submissions;
    }


    /**
     * Save submission
     * @throws \Exception
     */
    public function saveSubmission(Submission $submission, bool $runValidation = true): bool
    {
        // Start transaction
        $transaction = Craft::$app->getDb()->beginTransaction();

        try {
            // Validate submission
            if ($runValidation && !$submission->validate()) {
                return false;
            }

            $record = new SubmissionRecord();
            foreach ($submission->getSubmissionFields() as $handle => $field) {
                if ($field instanceof FileUploadField) {
                    $assets = [];
                    foreach ($field->uploadedFiles as $file) {
                        $assets[] = FormBuilder::getInstance()->upload->uploadFile($file, $submission, $handle);
                    }
                    $field->setValue($assets);
                }
            }

            $record->content = $submission->fieldsToFlatValues();
            $record->ipAddress = $submission->ipAddress;
            $record->formId = $submission->getForm()->id;
            $record->statusId = $submission->statusId;


            if ($this->hasEventHandlers(self::EVENT_BEFORE_SUBMISSION_SAVED)) {
                $this->trigger(self::EVENT_BEFORE_SUBMISSION_SAVED, new SubmissionEvent([
                    'submission' => $submission,
                ]));
            }

            if (!$record->save(false)) {
                Craft::error('Failed to save submission record: ' . implode(', ', $record->getErrorSummary(true)), __METHOD__);
                $transaction->rollBack();
                return false;
            }
            // Update submission model
            $submission->id = $record->id;
            $submission->uid = $record->uid;
            $submission->dateCreated = new DateTime($record->dateCreated);
            $submission->dateUpdated = new DateTime($record->dateUpdated);
            $transaction->commit();
            $submission->setState(Submission::STATE_COMPLETE);
            // Trigger event
            if ($this->hasEventHandlers(self::EVENT_AFTER_SUBMISSION_SAVED)) {
                $this->trigger(self::EVENT_AFTER_SUBMISSION_SAVED, new SubmissionEvent([
                    'submission' => $submission,
                ]));
            }

            return true;

        } catch (Exception|VolumeException| Throwable $e) {
            $transaction->rollBack();
            Craft::error('Error saving submission: ' . $e->getMessage(), __METHOD__);
            return false;
        }
    }

    public function processNotification(Submission $submission): void
    {
        if ($submission->getForm()->getAdminNotif()->enabled || $submission->getForm()->getUserNotif()->enabled) {
            Craft::$app->getQueue()->push(new SendNotificationJob([
                'submissionId' => $submission->id,
            ]));
        }

    }

    public function processIntegrations(Submission $submission): void
    {
        $integrations = $submission->getForm()->integrations;
        foreach ($integrations as $integration) {
            if ($integration->enabled) {
                Craft::$app->getQueue()->push(new IntegrationJob([
                    'submissionId' => $submission->id,
                    'integrationId' => $integration->id,
                ]));
            }
        }
    }

    /**
     * Resolves the ordered submission table columns for a form, falling back to the
     * built-in columns when the form has no column configuration yet.
     *
     * @return array<int, array{key: string, title: string}>
     */
    public function resolveColumns(?Form $form = null): array
    {
        $builtInTitles = FormSettings::builtInColumns();

        $keys = $form?->settings->submissionTableColumns ?? [];
        if (!$keys) {
            $keys = array_keys($builtInTitles);
        }

        $columns = [];
        foreach ($keys as $key) {
            if (isset($builtInTitles[$key])) {
                $columns[] = ['key' => $key, 'title' => $builtInTitles[$key]];
                continue;
            }
            $field = $form?->getFieldById($key);
            if ($field instanceof BaseInput) {
                $columns[] = ['key' => $key, 'title' => $field->label ?: $field->handle];
            }
        }

        // Not configurable: without it, deselecting the title column would leave no way
        // to open a submission. Header is blank, as is conventional for an action column.
        $columns[] = ['key' => self::COLUMN_VIEW, 'title' => ''];

        return $columns;
    }

    /**
     * Get table data with proper pagination and security
     * @throws \Exception
     */
    public function getTableData(int $formId = null, int $page = 1, int $perPage = 25): array
    {
        $page = max($page, 1);
        $perPage = max($perPage, 1);
        $perPage = min($perPage, 100); // Max 100 per page
        $offset = ($page - 1) * $perPage;

        $query = SubmissionRecord::find();
        
        if ($formId) {
            $query->andWhere(['formId' => $formId]);
        }

        $total = $query->count();
        $query->alias('s');
        $query->orderBy(['dateCreated' => SORT_DESC])
              ->offset($offset)
              ->limit($perPage);
        $query->leftJoin('{{%formbuilder_forms}} f', '[[f.id]] = [[s.formId]]');
        $query->select([
            's.*', // select all fields from submissions table
            'f.name AS formName',
            'f.handle AS formHandle' // select specific field from forms table
        ]);

        $records = $query->asArray()->all();

        $lastPage = (int)ceil($total / $perPage);
        $from = $total > 0 ? $offset + 1 : 0;
        $to = min($offset + $perPage, $total);

        // Build pagination URLs
        $baseUrl = UrlHelper::cpUrl(Craft::$app->getRequest()->getPathInfo());
        $params = Craft::$app->getRequest()->getQueryParams();
        $params['perPage'] = $perPage;

        $nextPageUrl = $page < $lastPage ? UrlHelper::url($baseUrl, array_merge($params, ['page' => $page + 1])) : null;
        $prevPageUrl = $page > 1 ? UrlHelper::url($baseUrl, array_merge($params, ['page' => $page - 1])) : null;

        $form = $formId ? FormBuilder::getInstance()->forms->getFormById($formId) : null;
        $columns = $this->resolveColumns($form);

        // One reusable submission field per field column: setValue() fully resets it, so
        // there's no need to rebuild the model for every row.
        $fieldColumns = [];
        foreach ($columns as $column) {
            $field = $form?->getFieldById($column['key']);
            if ($field instanceof BaseInput) {
                $fieldColumns[$column['key']] = $field->createSubmissionField();
            }
        }

        $data = [];
        foreach ($records as $record) {
            $content = $record['content'] ?? [];
            if (is_string($content)) {
                $content = json_decode($content, true) ?: [];
            }

            $row = ['id' => $record['id'], 'url' => UrlHelper::cpUrl('form-builder/submissions/' . $record['formHandle'] . '/' . $record['id'])];
            foreach ($columns as $column) {
                $key = $column['key'];
                $row[$key] = isset($fieldColumns[$key])
                    ? $this->_fieldColumnValue($fieldColumns[$key], $content[$key] ?? null)
                    : $this->_builtInColumnValue($key, $record);
            }
            $data[] = $row;
        }

        return [
            'data' => $data,
            'pagination' => [
                'total' => (int)$total,
                'per_page' => (int)$perPage,
                'current_page' => (int)$page,
                'last_page' => (int)$lastPage,
                'next_page_url' => $nextPageUrl,
                'prev_page_url' => $prevPageUrl,
                'from' => (int)$from,
                'to' => (int)$to,
            ],
        ];
    }

    /**
     * Builds a built-in (non field) submission table cell.
     */
    private function _builtInColumnValue(string $key, array $record): mixed
    {
        return match ($key) {
            FormSettings::COLUMN_TITLE => $this->_submissionTitle($record),
            FormSettings::COLUMN_FORM_NAME => $record['formName'],
            FormSettings::COLUMN_DATE_CREATED => $record['dateCreated']
                ? (new DateTime($record['dateCreated']))->format('Y-m-d H:i')
                : null,
            self::COLUMN_VIEW => '<a href="' . $this->_submissionUrl($record) . '">'
                . Craft::t('form-builder', 'View') . '</a>',
            default => null,
        };
    }

    private function _submissionTitle(array $record): string
    {
        $title = "Submission #{$record['id']}";
        if ($record['statusId']) {
            $status = FormBuilder::getInstance()->submissionStatuses->getById($record['statusId']);
            $title = "<span class='status $status->color'></span> $title";
        }
        return $title;
    }

    private function _submissionUrl(array $record): string
    {
        return UrlHelper::cpUrl('form-builder/submissions/' . $record['formHandle'] . '/' . $record['id']);
    }

    /**
     * Builds a form field cell. Cell values are rendered as HTML by the admin table,
     * so submitted content is encoded here.
     */
    private function _fieldColumnValue(BaseField $submissionField, mixed $value): string
    {
        $submissionField->setValue($value);
        return Html::encode($submissionField->getDisplayValue());
    }

    /**
     * Delete submission
     */
    public function deleteSubmission(int $id): bool
    {
        $record = SubmissionRecord::findOne(['id' => $id]);
        
        if (!$record) {
            return false;
        }

        try {
            return (bool)$record->delete();
        } catch (Exception|Throwable $e) {
            Craft::error('Error deleting submission: ' . $e->getMessage(), __METHOD__);
            return false;
        }
    }

    /**
     * @throws Exception
     */
    public function updateSubmissionStatus(Submission $submission, int $statusId): bool
    {
        $id = $submission->id;
        $record = SubmissionRecord::findOne(['id' => $id]);
        if (!$record) {
            throw new Exception("Submission with ID {$id} not found.");
        }
        $record->statusId = $statusId;
        return $record->save();
    }

    /**
     * Create submission model from record
     */
    private function createSubmissionFromRecord(SubmissionRecord $record): ?Submission
    {
        try {
            $form = FormBuilder::getInstance()->forms->getFormById($record->formId);

            if (!$form) {
                return null;
            }

            $submission = new Submission($form);
            $submission->setState(Submission::STATE_COMPLETE);
            $submission->id = $record->id;
            $submission->uid = $record->uid;
            $submission->ipAddress = $record->ipAddress;
            $submission->statusId = $record->statusId;
            $submission->dateCreated = $record->dateCreated ? new DateTime($record->dateCreated) : null;
            $submission->dateUpdated = $record->dateUpdated ? new DateTime($record->dateUpdated) : null;

            // Populate field values
            foreach ($submission->getSubmissionFields() as $fieldName => $field) {;
                $value = $record->content[$field->getFormField()->id] ?? null;
                $submission->setSubmissionFieldValue($fieldName, $value);
            }

            return $submission;
        } catch (\Exception $e) {
            Craft::error('Error creating submission from record: ' . $e->getMessage(), __METHOD__);
            return null;
        }
    }
}