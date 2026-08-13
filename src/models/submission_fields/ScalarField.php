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
        // Older submissions were stored with HTML entities baked in (e.g. "&#039;"); decode
        // them here so both legacy and current data end up as the same raw value. This is a
        // no-op for current submissions, which are no longer pre-encoded before saving.
        $this->_value = is_string($value) ? html_entity_decode($value, ENT_QUOTES) : $value;
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

    public function getDisplayValue(): string
    {
        return (string)$this->_value;
    }
}