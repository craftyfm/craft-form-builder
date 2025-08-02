<?php

namespace craftyfm\formbuilder\models\form_fields;

use craft\base\Model;
use craftyfm\formbuilder\helpers\Utils;
use craftyfm\formbuilder\models\submission_fields\ScalarField;

class Radio extends BaseInput
{
    public static string $type = 'radio';
    public array $options = [];

    public function __construct($form, $config = [])
    {
        if (isset($config['options'])) {
            $this->options = Utils::normalizeOptions($config['options']);
        }
        parent::__construct($form, $config);
    }

    public function createSubmissionField(): ScalarField
    {
        return new ScalarField($this);
    }

}
