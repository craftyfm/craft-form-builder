<?php

namespace craftyfm\formbuilder\models;

use craft\base\Model;
use craft\helpers\UrlHelper;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\integrations\base\IntegrationInterface;
use craftyfm\formbuilder\models\form_fields\Base;
use craftyfm\formbuilder\records\FormRecord;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Markup;
use yii\base\Exception;

class Form extends Model
{


    public ?int $id = null;
    public ?int $authorId = null;
    public ?string $uid = null;

    // general
    public string $name = '';
    public string $handle = '';

    /** @var IntegrationInterface[] $integrations */
    public array $integrations = [];
    public FormSettings $settings;
    private array $_fields = [];
    private EmailNotification $_adminNotif;
//    private
    public function __construct($config = [])
    {
        $parentConfig = [
            'name' => $config['name'] ?? null,
            'handle' => $config['handle'] ?? '',
            'uid' => $config['uid'] ?? null,
            'id' => $config['id'] ?? null,
            'settings' => $config['settings'] ?? new FormSettings(),
            'integrations' => $config['integrations'] ?? [],
        ];

        if (isset($config['adminNotif'])) {
            $this->setAdminNotif($config['adminNotif']);
        }

        parent::__construct($parentConfig);
    }


    public function __set($name, $value)
    {
        if (property_exists($this, $name)) {
            $this->$name = $value;
        }
    }

    public function setFields(array $fields): void
    {
        $this->_fields = $fields;
    }

    public function getFields(): array
    {
        return $this->_fields;
    }

    public function addFields(string $handle, Base $field): void
    {
        $this->_fields[$handle] = $field;
    }

    public function getSortedFields(): array
    {
        $fields = array_values($this->getFields()); // drop keys, keep values

        usort($fields, function($a, $b) {
            return $a->order <=> $b->order;
        });

        return $fields;
    }

    public function setAdminNotif(EmailNotification $adminNotif): void
    {

        $this->_adminNotif = $adminNotif;
        $this->_adminNotif->formId = $this->id;
        $this->_adminNotif->type = 'notification';
    }

    public function getAdminNotif(): EmailNotification
    {
        if (isset($this->_adminNotif)) {
            return $this->_adminNotif;
        }
        if ($this->id === null) {
            $this->setAdminNotif(new EmailNotification());
            return $this->_adminNotif;
        }
        $emailNotif = FormBuilder::getInstance()->emailNotification->getNotificationByFormId($this->id);
        if (!$emailNotif) {
            $this->setAdminNotif(new EmailNotification());
        } else {
            $this->setAdminNotif($emailNotif);
        }
        return $this->_adminNotif;
    }

    protected function defineRules(): array
    {
        $rules = [
            // Required fields
            [['handle', 'name'], 'required'],
        
            // Ensure handle is unique
            // String validation for text fields
            [['handle', 'name'], 'string'],

        ];

        $rules[] = [
            'handle',
            'unique',
            'targetClass' => FormRecord::class,
            'targetAttribute' => 'handle',
            'filter' => function($query) {
                if ($this->id !== null) {
                    $query->andWhere(['not', ['id' => $this->id]]);
                }
            },
            'message' => 'Handle must be unique.'
        ];

        return $rules;
    }
    public function asArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'handle' => $this->handle,
            'settings' => $this->settings->toArray(),
            'adminNotif' => $this->getAdminNotif()->toArray(),
            'fields' => $this->getFieldsAsArray(),
            'integrations' => $this->getIntegrationsAsArray(),
            'authorId' => $this->authorId,
            'uid' => $this->uid,
        ];
    }
    public function getFieldsAsArray(): array
    {
        $fields = [];

        foreach ($this->getSortedFields() as $field) {
            $fields[] = $field->toArray();
        }
        return $fields;
    }

    public function getIntegrationsAsArray(): array
    {
        $integrations = [];
        foreach ($this->integrations as $integration) {
            $settings = $integration->getFormSettings();
            $settings['enabled'] = $integration->enabled;
            $integrations[$integration->handle] = $settings;
        }
        return $integrations;
    }

    public function getEditUrl(): string
    {
        return UrlHelper::cpUrl('form-builder/forms/' . $this->id);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws Exception
     * @throws LoaderError
     */
    public function render(bool $loadAsset = true): Markup
    {
        return FormBuilder::getInstance()->forms->renderForm($this, $loadAsset);
    }
}