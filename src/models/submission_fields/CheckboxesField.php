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
        // Older submissions were stored with HTML entities baked in; decode them here so both
        // legacy and current data match against option values consistently. No-op for current
        // submissions, which are no longer pre-encoded before saving.
        $this->_values = array_map(
            fn($v) => is_string($v) ? html_entity_decode($v, ENT_QUOTES) : $v,
            $value
        );
    }

    public function getValue(): array
    {
        return $this->_values ?? [];
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

    public function getDisplayValue(): string
    {
        return implode(', ', $this->getValue());
    }
}