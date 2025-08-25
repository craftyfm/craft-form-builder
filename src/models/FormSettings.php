<?php

namespace craftyfm\formbuilder\models;

use craft\base\Model;

class FormSettings extends Model
{
    const ORIENTATION_VERTICAL = 'vertical';
    const ORIENTATION_HORIZONTAL = 'horizontal';
    const FRAMEWORK_BOOTSTRAP = 'bootstrap';
    const FRAMEWORK_TAILWIND = 'tailwind';

    const ACTION_MESSAGE = 'message';
    const ACTION_REDIRECT = 'redirect';

    public bool $collectIp = false;


    // layouts
    public string $orientation = self::ORIENTATION_VERTICAL;
    public string $framework = self::FRAMEWORK_BOOTSTRAP;
    public bool $outputFrameworkAssets = false;
    public string $icons = '';
    public string $class = '';

    // Action behavior
    public string $redirectUrl = '';
    public string $actionOnSubmit = self::ACTION_MESSAGE;
    public string $successMessage = 'Thank you for your submission!';

    public function __construct(array $data = [])
    {

        parent::__construct($data);
    }

    public function __set($name, $value)
    {
        if (property_exists($this, $name)) {
            $this->$name = $value;
        }
    }

    protected function defineRules(): array
    {
        return [
            // Required fields
            [['framework'], 'required'],

            // Ensure handle is unique
            // String validation for text fields
            [['orientation', 'framework', 'icons', 'class'], 'string'],

            // Ensure layout is one of the allowed values
            ['orientation', 'in', 'range' => [self::ORIENTATION_VERTICAL, self::ORIENTATION_HORIZONTAL]],

            // Ensure framework is one of the allowed values
            ['framework', 'in', 'range' => [self::FRAMEWORK_BOOTSTRAP, self::FRAMEWORK_TAILWIND]],
            // Validate numbers
            ['actionOnSubmit', 'in', 'range' => [self::ACTION_MESSAGE, self::ACTION_REDIRECT]],
        ];
    }
}