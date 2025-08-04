<?php

namespace craftyfm\formbuilder\services;

use Craft;
use craft\base\Component;
use craft\errors\VolumeException;
use craft\helpers\UrlHelper;
use craftyfm\formbuilder\events\SubmissionEvent;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\jobs\IntegrationJob;
use craftyfm\formbuilder\jobs\SendNotificationJob;
use craftyfm\formbuilder\models\Submission;
use craftyfm\formbuilder\models\submission_fields\FileUploadField;
use craftyfm\formbuilder\records\SubmissionRecord;
use DateTime;
use Throwable;
use yii\db\Exception;

class Submissions extends Component
{
    public const EVENT_BEFORE_SUBMISSION_SAVED = 'beforeSubmissionSaved';
    public const EVENT_AFTER_SUBMISSION_SAVED = 'afterSubmissionSaved';
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
            dd($e->getMessage());;
            $transaction->rollBack();
            Craft::error('Error saving submission: ' . $e->getMessage(), __METHOD__);
            return false;
        }
    }

    public function processNotification(Submission $submission): void
    {
        Craft::$app->getQueue()->push(new SendNotificationJob([
            'submissionId' => $submission->id,
        ]));
    }

    public function processIntegrations(Submission $submission): void
    {
        $integrations = $submission->getForm()->integrations;
        foreach ($integrations as $integration) {
            if ($integration->enabled) {
                Craft::$app->getQueue()->push(new IntegrationJob([
                    'submissionId' => $submission->id,
                    'integrationHandle' => $integration->handle,
                ]));
            }
        }
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

        $data = [];
        foreach ($records as $record) {
            $title = "Submission #{$record['id']}";
            if ($record['statusId']) {
                $status = FormBuilder::getInstance()->submissionStatuses->getById($record['statusId']);
                $title = "<span class='status $status->color'></span> $title";
            }
            $data[] = [
                'id' => $record['id'],
                'title' => [
                    'html' => $title,
                    'url' => UrlHelper::cpUrl('form-builder/submissions/'. $record['formHandle'] .'/' . $record['id']),
                ],
                'formName' => $record['formName'],
                'dateCreated' => $record['dateCreated'] ? (new DateTime($record['dateCreated']))->format('Y-m-d H:i') : null,
            ];
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