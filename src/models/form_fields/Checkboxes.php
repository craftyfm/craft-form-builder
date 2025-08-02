<?php

namespace craftyfm\formbuilder\models\form_fields;

use craftyfm\formbuilder\helpers\Utils;
use craftyfm\formbuilder\models\submission_fields\CheckboxesField;

class Checkboxes extends BaseInput
{
    public static string $type = 'checkboxes';

    public array $options = [];

    public function __construct($form, $config = [])
    {
        if (isset($config['options'])) {
            $this->options = Utils::normalizeOptions($config['options']);
        }
        parent::__construct($form, $config);
    }

    public function createSubmissionField(): CheckboxesField
    {
       return new CheckboxesField($this);
    }
}
