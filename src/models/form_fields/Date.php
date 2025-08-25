<?php

namespace craftyfm\formbuilder\models\form_fields;

use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\models\submission_fields\DateField;
use craftyfm\formbuilder\models\submission_fields\ScalarField;

class Date extends BaseInput
{

    public static string $type = 'date';

    public string $placeholder;

    public function __construct($form, $config = [])
    {
        $this->placeholder = $config['placeholder'] ?? '';

        parent::__construct($form, $config);
    }

    public function submissionValueRules(): array
    {
        $rules = parent::submissionValueRules();
        return $rules;
    }

    public function createSubmissionField(): DateField
    {
        return new DateField($this);
    }
}