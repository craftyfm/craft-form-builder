<?php

namespace craftyfm\formbuilder\models\form_fields;

class SubmitButton extends Base
{
    public static string $type = 'submitButton';
    public string $submitText = 'Submit';
    public string $resetText = 'Reset';
    public  string $submitStyle = 'primary';
    public string $resetStyle = 'secondary';
    public string $spacing = 'wide';

    public function __construct($form, $config = [])
    {
        $this->resetStyle = $config['resetStyle'] ?? $this->resetStyle;
        $this->submitStyle = $config['submitStyle'] ?? $this->submitStyle;
        $this->submitText = $config['submitText'] ?? $this->submitText;
        $this->resetText = $config['resetText'] ?? $this->resetText;
        $this->spacing = $config['spacing'] ?? $this->spacing;

        parent::__construct($form, $config);
    }

}