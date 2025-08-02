<?php

namespace craftyfm\formbuilder\models\form_fields;

use craft\base\Model;

abstract class BaseInput extends Base
{
    public string $label;
    public string $desc;
    public bool $required;
    public mixed $defaultValue;
    protected static bool $isSubmissionField = true;

    public function __construct($form, $config = [])
    {
        $this->label = $config['label'] ?? '';
        $this->desc = $config['desc'] ?? '';
        $this->required = $config['required'] ?? false;
        $this->defaultValue = $config['defaultValue'] ?? null;
        parent::__construct($form, $config);
    }

    protected function defineRules(): array
    {
        return [
            [['label', 'handle', 'desc'], 'string'],
            [['label', 'handle'], 'required'],
            [['required'], 'boolean'],
            [['defaultValue'], 'safe'],
        ];
    }

    public function submissionValueRules(): array
    {
        $rules = [];
        if ($this->required) {
            $rules[] = [['value'], 'required'];;
        }

        return $rules;
    }

    abstract public function createSubmissionField();
}