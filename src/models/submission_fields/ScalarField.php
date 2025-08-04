<?php

namespace craftyfm\formbuilder\models\submission_fields;

class ScalarField extends BaseField
{
    public ?string $_value = null;
    public function rules(): array
    {
        return $this->formField->submissionValueRules();
    }

    public function __toString(): string
    {
        return (string)$this->_value;
    }

    public function compileSaveData(): ?string
    {
        return $this->getValue();
    }

    public function setValue($value): void
    {
        $this->_value = $value;
    }

    public function getValue(): ?string
    {
       return $this->_value;
    }

    public function setDraftValues($value): void
    {
       $this->setValue($value);
    }

    public function getValueAsJson($encode = false): false|string|null
    {
        return $encode ? json_encode($this->getValue()) : $this->getValue();
    }
}