<?php

namespace craftyfm\formbuilder\models;

use craft\base\Model;
use craft\helpers\UrlHelper;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\models\form_fields\Base;
use craftyfm\formbuilder\models\form_fields\BaseCaptcha;
use craftyfm\formbuilder\models\form_fields\BaseInput;
use craftyfm\formbuilder\models\submission_fields\ScalarField;
use DateTime;
use yii\base\UnknownPropertyException;

class Submission extends Model
{
    const STATE_CREATE = 'create';
    const STATE_COMPLETE = 'complete';



    public ?int $id = null;
    public ?string $ipAddress = null;
    public ?string $uid = null;
    public ?DateTime $dateUpdated = null;
    public ?DateTime $dateCreated = null;

    /** @var \craftyfm\formbuilder\integrations\captcha\BaseCaptcha  */
    public mixed $captcha = null;
    /**
     * @var ScalarField|int|mixed|null
     */
    public ?int $statusId = null;

    private SubmissionStatus $status;
    private string $_state = Submission::STATE_CREATE;

    /** @var ScalarField[] $_fields */
    private array $_fields = [];
    private Form $_form;

    public function __construct(Form $form, $config = [])
    {
        $this->_form = $form;

        /** @var Base $field */
        foreach ($this->_form->getFields() as $field) {
            if ($field instanceof BaseInput) {
                $this->_fields[$field->handle] = $field->createSubmissionField();
            } elseif ($field instanceof BaseCaptcha) {
                $this->captcha = $field->getCaptchaIntegration();
            }
        }
        
        parent::__construct($config);
    }

    public function setState(string $state): void
    {
        $this->_state = $state;
    }

    public function getState(): string
    {
        return $this->_state;
    }

    public function getForm(): Form
    {
        return $this->_form;
    }

    public function setSubmissionFieldValue(string $fieldName, mixed $value): void
    {
       if ($this->_state === Submission::STATE_CREATE) {
           $this->_fields[$fieldName]->setDraftValues($value);
       } else {
           $this->_fields[$fieldName]->setValue($value);
       }
    }

    public function getSubmissionFields(): array
    {
        return $this->_fields;
    }

    public function getFieldValuesAsJson(bool $encode = false): array
    {
        return array_map(function ($field) use ($encode) {
            return $field->getValueAsJson($encode);
        }, $this->_fields);


    }
    public function setStatus(SubmissionStatus $status): void
    {
        $this->status = $status;
        $this->statusId = $status->id;

    }

    public function getStatus(): ?SubmissionStatus
    {
        if (isset($this->status)) {
            return $this->status;
        }

        if (!$this->statusId) {
            return null;
        }
        $this->status = FormBuilder::getInstance()->submissionStatuses->getById($this->statusId);
        return $this->status;
    }

    public function fieldsToFlatValues(): array
    {
        $data = [];
        foreach ($this->_fields as $field){
            $data[$field->getFormField()->id] = $field->compileSaveData();
        }

        return $data;
    }
    public function getFieldAsArray(): array
    {
        return array_map(function ($field) {
            return $field->value;
        }, $this->_fields);
    }


    public function defineRules(): array
    {
        $rules = [
            ['ipAddress', 'string', 'max' => 45],
        ];

        foreach ($this->_fields as $handle =>$field) {
            $rules[] = [$handle, fn() => $this->_validateField($handle), 'skipOnEmpty' => false];
        }
        return $rules;
    }

    private function _validateField($attribute): void
    {
        $fieldModel = $this->_fields[$attribute] ?? null;
        if ($fieldModel && !$fieldModel->validate()) {
            foreach ($fieldModel->getErrors() as $errors) {
                foreach ($errors as $error) {
                    $this->addError($attribute, $error);
                }
            }
        }
    }

    /**
     * Get field value for attribute
     * @throws UnknownPropertyException
     */
    public function __get($name)
    {
        if (isset($this->_fields[$name])) {
            return $this->_fields[$name];
        }
        
        return parent::__get($name);
    }

    /**
     * Set field value for attribute
     * @throws UnknownPropertyException
     */
    public function __set($name, $value)
    {
        if (isset($this->_fields[$name])) {
            $this->_fields[$name]->value = $value;
            return;
        }
        
        parent::__set($name, $value);
    }

    /**
     * Check if attribute exists
     */
    public function __isset($name)
    {
        return isset($this->_fields[$name]) || parent::__isset($name);
    }

    public function getCpUrl(): string
    {
        return UrlHelper::cpUrl('form-builder/submissions/'. $this->_form->handle .'/' . $this->id);
    }

    /**
     * Get all attribute names including field names
     */
    public function attributes(): array
    {
        return array_merge(
            parent::attributes(),
            array_keys($this->_fields)
        );
    }
}