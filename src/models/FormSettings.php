<?php

namespace craftyfm\formbuilder\models;

use Craft;
use craft\base\Model;

class FormSettings extends Model
{
    const ORIENTATION_VERTICAL = 'vertical';
    const ORIENTATION_HORIZONTAL = 'horizontal';
    const FRAMEWORK_BOOTSTRAP = 'bootstrap';
    const FRAMEWORK_TAILWIND = 'tailwind';

    const ACTION_MESSAGE = 'message';
    const ACTION_REDIRECT = 'redirect';

    const COLUMN_TITLE = 'title';
    const COLUMN_FORM_NAME = 'formName';
    const COLUMN_DATE_CREATED = 'dateCreated';

    /**
     * The submission table columns that aren't form fields, and the default selection.
     * Single source of truth: everything else derives its key list from this.
     *
     * @return array<string, string> column key => title
     */
    public static function builtInColumns(): array
    {
        return [
            self::COLUMN_TITLE => Craft::t('form-builder', 'Title'),
            self::COLUMN_FORM_NAME => Craft::t('form-builder', 'Form'),
            self::COLUMN_DATE_CREATED => Craft::t('form-builder', 'Date Submitted'),
        ];
    }

    public bool $collectIp = false;

    /**
     * Ordered submission table column keys. Each entry is a built-in column key
     * or a form field id. Empty means "not configured" — the defaults are used.
     * @var string[]
     */
    public array $submissionTableColumns = [];


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

            ['submissionTableColumns', 'safe'],
        ];
    }
}