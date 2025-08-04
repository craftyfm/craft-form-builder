<?php

namespace craftyfm\formbuilder\models\form_fields;

use craftyfm\formbuilder\models\submission_fields\ScalarField;

class Checkbox extends BaseInput
{
    public static string $type = 'checkbox';

    public string $checkboxLabel = '';
    public function __construct($form, $config = [])
    {
        if (isset($config['checkboxLabel'])) {
            $this->checkboxLabel = $config['checkboxLabel'];
        }
        parent::__construct($form, $config);
    }

    public function createSubmissionField(): ScalarField
    {
        return new ScalarField($this);
    }

}
