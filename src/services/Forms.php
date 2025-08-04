<?php

namespace craftyfm\formbuilder\services;

use Craft;
use craft\base\Component;
use craft\errors\MissingComponentException;
use craft\helpers\StringHelper;
use craft\helpers\Template;
use craft\helpers\UrlHelper;
use craft\web\View;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\helpers\Utils;
use craftyfm\formbuilder\integrations\base\BaseIntegration;
use craftyfm\formbuilder\models\Form;
use craftyfm\formbuilder\models\FormSettings;
use craftyfm\formbuilder\models\Submission;
use craftyfm\formbuilder\records\FormRecord;
use craftyfm\formbuilder\web\assets\formbuilder\FormBuilderAsset;
use DateTime;
use InvalidArgumentException;
use RuntimeException;
use Throwable;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Markup;
use yii\base\Exception;
use yii\base\InvalidConfigException;
use yii\db\StaleObjectException;

class Forms extends Component
{
    /**
     * @throws \Exception
     * @return Form[]
     */
    public function getAllForms(): array
    {
        $records = FormRecord::find()->all();
        $forms = [];
        foreach ($records as $record) {
            $forms[] = $this->_populateModel($record);
        }
        return $forms;
    }

    /**
     * @throws \Exception
     */
    public function getFormById(int $id): ?Form
    {
        $record = FormRecord::findOne(['id' => $id]);
        if(!$record) {
            return null;
        }

        return $this->_populateModel($record);
    }

    /**
     * @throws \Exception
     */
    public function getFormByHandle(string $handle): ?Form
    {
        $record = FormRecord::findOne(['handle' => $handle]);
        if(!$record) {
            return null;
        }

        return $this->_populateModel($record);
    }

    /**
     * Saves a form (insert or update).
     *
     * @param array $data {
     *     @var int|null $id
     *     @var string $name
     *     @var string|null $orientation
     *     @var string|null $framework
     *     @var string|null $icons
     *     @var string|null $class
     *     @var array|null $fields
     * }
     *
     * @return FormRecord|null
     * @throws Throwable
     * @throws MissingComponentException
     * @throws Exception
     */
    public function saveForm(Form $data): ?Form
    {
        if(!$data->validate()) {
            return $data;
        }
        if ($data->id !== null) {
            $record = FormRecord::findOne(['id' => $data->id]);
        } elseif ($data->uid !== null) {
            $record = FormRecord::findOne(['uid' => $data->uid]);
        } else {
            $record = new FormRecord();
        }

        if (!$record) {
            throw new Exception("Form with ID {$data->uid} not found.");
        }

        $transaction = Craft::$app->getDb()->beginTransaction();

        try {
            $record->name = $data->name;
            $record->handle = $data->handle;
            $record->authorId = $data->authorId;
            $record->fields = $data->getFieldsAsArray();
            $record->settings = $data->settings->toArray();
            $record->integrations = $data->getIntegrationsAsArray();
            if (!$record->validate()) {
                Craft::error('Failed to save form: ' . json_encode($record->getErrors()), __METHOD__);
                return null;
            }
            $record->save(false); // skip re-validation since it's done above

            $adminEmailNotif = $data->getAdminNotif();
            $adminEmailNotif->formId = $record->id;
            if (!FormBuilder::getInstance()->emailNotification->saveNotification($adminEmailNotif)) {
                throw new Exception('Failed to save notification');
            }
            $data->id = $record->id;
            $data->uid = $record->uid;
            $transaction->commit();
        }catch (Throwable $e) {
            $transaction->rollBack();
            throw $e;
        }
        return $data;
    }

    /**
     * @throws Throwable
     * @throws StaleObjectException
     */
    public function deleteForm(int $id): bool
    {
        if ($id <= 0) {
            throw new InvalidArgumentException("Form ID must be a positive integer.");
        }

        $record = FormRecord::findOne(['id' => $id]);

        if (!$record) {
            throw new RuntimeException("Form with ID {$id} not found.");
        }

        return $record->delete();
    }


    /**
     * @throws SyntaxError
     * @throws InvalidConfigException
     * @throws RuntimeError
     * @throws Exception
     * @throws LoaderError
     */
    public function renderFormBuilder(): string
    {
        $view = Craft::$app->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);
        $iconSets = FormBuilder::getInstance()->icons->listAvailableIconSets();
        return $view->renderTemplate('form-builder/_builder', compact('iconSets'));
    }


    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws Exception
     * @throws LoaderError
     * @throws \Exception
     */
    public function renderFormByHandle($formHandle, $loadAsset = true): Markup
    {
        $form = $this->getFormByHandle($formHandle);
        return $this->renderForm($form, $loadAsset);
    }

    /**
     * @throws SyntaxError
     * @throws Exception
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function renderForm(Form $form, $loadAsset = true): Markup
    {
        $routeParams = Craft::$app->getUrlManager()->getRouteParams();
        $submission = $routeParams['submission'] ?? new Submission($form);
        $view = Craft::$app->getView();
        return Template::raw($view->renderTemplate('form-builder/_render/index',
            compact('form', 'submission', 'loadAsset'),
            View::TEMPLATE_MODE_CP));
    }

    /**
     * construct form model from using json data.
     * @throws \Exception
     */
    public function constructForms(array $formJson): Form
    {

        if (!empty($formJson['id'])) {
            $formJson['adminNotif']['id'] = FormBuilder::getInstance()->emailNotification->getNotificationIdByFormId($formJson['id']);
        }

        $form = new Form([
            'name' => $formJson['name'] ?? null,
            'handle' => $formJson['handle'] ?? '',
            'id' => $formJson['id'] ?? null,
            'settings' => new FormSettings($formJson['settings'] ?? []),
            'adminNotif' => new \craftyfm\formbuilder\models\EmailNotification($formJson['adminNotif'] ?? []),
        ]);

        if (isset($formJson['fields'])) {
            $form->setFields($this->_constructFormFields($formJson['fields'], $form));
        }

        if(isset($formJson['integrations'])) {
            $form->integrations = $this->_constructFormIntegrations($formJson['integrations']);
        }

        return $form;

    }

    public function sanitizeOrGenerateHandle(string $label, string $handle): string
    {
        if (empty($handle) && empty($label)) {
            return '';
        }
        $handle = StringHelper::toCamelCase($handle);
        if (!$handle) {
            // Generate a fallback handle from label or random string
            $slug = StringHelper::toCamelCase(StringHelper::toAscii($label));
            $handle = $slug . StringHelper::randomString(6);
        }
        return $handle;
    }

    /**
     * @throws InvalidConfigException
     * @throws \Exception
     */
    public function getFormsTableData(int $page = 1, int $perPage = 25): array
    {
        $page = max($page, 1);
        $perPage = max($perPage, 1);
        $offset = ($page - 1) * $perPage;

        $query = FormRecord::find();
        $total = $query->count();

        $records = $query
            ->offset($offset)
            ->limit($perPage)
            ->all();

        $lastPage = (int)ceil($total / $perPage);
        $from = $total > 0 ? $offset + 1 : 0;
        $to = min($offset + $perPage, $total);

        // Build current URL with updated page param
        $baseUrl = UrlHelper::cpUrl(Craft::$app->getRequest()->getPathInfo());
        $params = Craft::$app->getRequest()->getQueryParams();
        $params['perPage'] = $perPage;

        $nextPageUrl = $page < $lastPage ? UrlHelper::url($baseUrl, array_merge($params, ['page' => $page + 1])) : null;
        $prevPageUrl = $page > 1 ? UrlHelper::url($baseUrl, array_merge($params, ['page' => $page - 1])) : null;

        $data = [];
        foreach ($records as $record) {

            $settings = new FormSettings($record['settings'] ?? []);
            $data[] = [
                'id' => $record['id'],
                'title' => $record['name'],
                'handle' => $record['handle'],
                'framework' => ucfirst($settings['framework']),
                'orientation' => ucfirst($settings['orientation']),
                'url' => UrlHelper::cpUrl('form-builder/forms/' . $record['id']),
                'created' => $record['dateCreated'] ? (new DateTime($record['dateCreated']))->format('Y-m-d H:i') : null,
                'updated' => $record['dateUpdated'] ? (new DateTime($record['dateUpdated']))->format('Y-m-d H:i') : null,
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
     * @throws \Exception
     */
    private function _populateModel(FormRecord $record): Form
    {
        $formSettings = new FormSettings($record->settings ?? []);;
        $model = new Form(['settings' => $formSettings]);
        $model->id = $record->id;
        $model->handle = $record->handle;
        $model->uid = $record->uid;
        $model->name = $record->name;
        $model->setFields($this->_constructFormFields($record['fields'] ?? [], $model, false));
        $model->integrations = $this->_constructFormIntegrations($record['integrations'] ?? []);
        return $model;
    }

    private function _constructFormIntegrations(array $data): array
    {
        $integrations = [];
        $activeIntegrations = FormBuilder::getInstance()->integrations->getEnabledIntegrations();
        foreach ($activeIntegrations as $integration) {
            $integration->enabled = false;
            if (isset($data[$integration->handle])) {
                $integration->setFormSettings($data[$integration->handle]);
            }
            $integrations[$integration->handle] = $integration;
        }


        return $integrations;
    }

    /**
     * Construct the form fields from array json data.
     * @throws \Exception
     */
    private function _constructFormFields(array $data, Form $form, bool $checkHandle = true): array
    {
        $elementTypes = Utils::getFormFieldMap();

        $fields = [];
        $handles = [];
        foreach ($data as $key => $jsonElement) {
            $element = null;
            if (isset($jsonElement['type'])) {
                $type = $jsonElement['type'];
                if (!isset($elementTypes[$type])) {
                   continue;
                }
                $element = new $elementTypes[$type]($form, $jsonElement);
                if ($element !== null) {
                    $element->id = empty($jsonElement['id']) ? StringHelper::UUID(): $jsonElement['id'];
                    if ($checkHandle) {
                        $handle = $this->sanitizeOrGenerateHandle($jsonElement['label'] ?? $element::getType(), $jsonElement['handle'] ?? '');
                        if(in_array($handle, $handles)) {
                            $handle = $handle . $key;
                        }
                    } else {
                        $handle = $jsonElement['handle'] ?? '';
                    }
                    $handles[] = $handle;
                    $element->handle = $handle;
                    $element->order = $key;
                    if ($element->validate()) {
                        $fields[$handle] = $element;
                    }
                }
            }

        }
        return $fields;
    }
}