<?php

namespace craftyfm\formbuilder\models\form_fields;

use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\models\submission_fields\ScalarField;

class Number extends BaseInput
{

    public static string $type = 'number';


    public string $placeholder;
    public string $icon;
    public string $iconSet;

    public function __construct($form, $config = [])
    {
        $this->placeholder = $config['placeholder'] ?? '';
        $this->icon =  $config['icon'] ?? '';
        $this->iconSet =  $config['iconSet'] ?? '';

        parent::__construct($form, $config);
    }


    public function getIconSvg(): string
    {
        if (!$this->_parent->settings->icons) {
            return '';
        }
        if (!trim($this->icon)) {
            return '';
        }
        return FormBuilder::getInstance()->icons->getIconMarkup($this->icon, $this->_parent->settings->icons);
    }

    public function fields(): array
    {
        return array_merge(parent::fields(), [
            'iconSvg' => fn() => $this->getIconSvg(),
        ]);
    }

    public function submissionValueRules(): array
    {
        $rules = parent::submissionValueRules();
        $rules[] = [['value'], 'number'];
        return $rules;
    }

    public function createSubmissionField(): ScalarField
    {
        return new ScalarField($this);
    }
}