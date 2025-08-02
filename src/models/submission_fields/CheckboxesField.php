<?php

namespace craftyfm\formbuilder\models\submission_fields;

class CheckboxesField extends BaseField
{

    private ?array $_values = null;
    public function compileSaveData(): array
    {
       return $this->_values;
    }

    public function setValue($value): void
    {
        if (!is_array($value)) {
            $value = [];
        }
        $this->_values = $value;
    }

    public function getValue(): array
    {
        return $this->_values;
    }

    public function setDraftValues($value): void
    {
       $this->setValue($value);
    }


    public function rules(): array
    {
        $rules = [];
        if ($this->formField->required) {
            $rules[] = ['value', function($attribute) {
                if (empty($this->$attribute) || count($this->$attribute) === 0) {
                    $this->addError($attribute, 'This field is required.');
                }
            }, 'skipOnEmpty' => false];

        }
        return $rules;
    }

    public function getValueAsJson($encode = false): string|array|false
    {
        return $encode ? json_encode($this->getValue()) : $this->getValue();
    }
}