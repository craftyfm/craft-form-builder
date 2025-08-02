<?php

namespace craftyfm\formbuilder\models\form_fields;

use craft\base\Model;
use craftyfm\formbuilder\models\submission_fields\ScalarField;

class TextArea extends BaseInput
{
    public static string $type = 'textarea';
    public string $placeholder;
    public int $rows = 4;

    public int $minlength = 0;
    public int $maxlength = 0;

    public function __construct($form, $config = [])
    {
        $this->placeholder = $config['placeholder'] ?? '';
        $this->rows = intval($config['rows'] ?? $this->rows);
        $this->minlength = intval($config['minlength'] ?? $this->rows);
        $this->maxlength = intval($config['maxlength'] ?? $this->rows);
        parent::__construct($form, $config);
    }


    public function submissionValueRules(): array
    {
        $rules = parent::submissionValueRules();
        if ($this->minlength > 0 || $this->maxlength > 0) {
            $stringRule = ['value', 'string'];

            if ($this->minlength > 0) {
                $stringRule['min'] = $this->minlength;
            }

            if ($this->maxlength > 0) {
                $stringRule['max'] = $this->maxlength;
            }

            $rules[] = $stringRule;
        }
        return $rules;
    }

    public function createSubmissionField(): ScalarField
    {
        return new ScalarField($this);
    }
}