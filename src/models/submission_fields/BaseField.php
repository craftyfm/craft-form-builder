<?php

namespace craftyfm\formbuilder\models\submission_fields;

use craft\base\Model;
use craftyfm\formbuilder\models\form_fields\BaseInput;

abstract class BaseField extends Model
{
    protected BaseInput $formField;

    abstract public function compileSaveData();
    public function __construct(BaseInput $field)
    {
        $this->formField = $field;
        parent::__construct();
    }

    public function getFormField(): BaseInput
    {
        return $this->formField;
    }

    abstract public function setValue($value): void;

    abstract public function getValue();

    abstract public function setDraftValues($value): void;

    abstract public function getValueAsJson($encode = false);



}