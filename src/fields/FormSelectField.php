<?php

namespace craftyfm\formbuilder\fields;

use Craft;
use craft\base\ElementInterface;
use craft\base\Field;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\models\Form;
use yii\db\Schema;

class FormSelectField extends Field
{
    public static function displayName(): string
    {
        return Craft::t('form-builder', 'Form-Builder | Form Select');
    }

    public static function valueType(): string
    {
        return 'int'; // Store the selected form ID
    }

    /**
     * @throws \Exception
     */
    public function getInputHtml(mixed $value, ElementInterface $element = null): string
    {
        // Get forms from your plugin
        $forms = FormBuilder::getInstance()->forms->getAllForms(); // replace with your actual method

        $options = [ ['label' => 'Select a form', 'value' => null]];
        foreach ($forms as $form) {
            $options[] = ['label' => $form->name, 'value' => $form->id];
        }

        return Craft::$app->getView()->renderTemplate('form-builder/_fields/form', [
            'options' => $options,
            'name' => $this->handle,
            'value' => $value ? $value->id : null,
        ]);
    }

    public function getSettingsHtml(): ?string
    {
        // Optionally return HTML for any settings for this field type
        return '';
    }

    public static function dbType(): string
    {
        return Schema::TYPE_INTEGER;
    }

    public function serializeValue(mixed $value, ?ElementInterface $element = null): mixed
    {
        if($value instanceof Form) {
            $value = $value->id;
        }

        return parent::serializeValue($value, $element);
    }


    /**
     * @throws \Exception
     */
    public function normalizeValue(mixed $value, ElementInterface $element = null): ?Form
    {
        // If already a Form model, return as-is
        if ($value instanceof Form) {
            return $value;
        }

        // If it's a numeric ID, fetch the form
        if (is_numeric($value)) {
            return FormBuilder::getInstance()->forms->getFormById((int)$value);
        }

        return null;
    }

}