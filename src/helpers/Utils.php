<?php

namespace craftyfm\formbuilder\helpers;

use craftyfm\formbuilder\models\form_fields\Checkbox;
use craftyfm\formbuilder\models\form_fields\Checkboxes;
use craftyfm\formbuilder\models\form_fields\Email;
use craftyfm\formbuilder\models\form_fields\FileUpload;
use craftyfm\formbuilder\models\form_fields\Hcaptcha;
use craftyfm\formbuilder\models\form_fields\Html;
use craftyfm\formbuilder\models\form_fields\Image;
use craftyfm\formbuilder\models\form_fields\Number;
use craftyfm\formbuilder\models\form_fields\Paragraph;
use craftyfm\formbuilder\models\form_fields\Phone;
use craftyfm\formbuilder\models\form_fields\Radio;
use craftyfm\formbuilder\models\form_fields\Recaptcha;
use craftyfm\formbuilder\models\form_fields\Select;
use craftyfm\formbuilder\models\form_fields\SubmitButton;
use craftyfm\formbuilder\models\form_fields\Text;
use craftyfm\formbuilder\models\form_fields\TextArea;
use craftyfm\formbuilder\models\form_fields\Title;
use craftyfm\formbuilder\models\form_fields\Url;

class Utils
{

    public static function normalizeOptions($options): array
    {
        $normalized = [];

        foreach ($options as $option) {
            if (is_array($option)) {
                $normalized[] = [
                    'name' => $option['name'] ?? '',
                    'value' => $option['value'] ?? '',
                    'isDefault' => (bool)($option['isDefault'] ?? false),
                ];
            }
        }

        return $normalized;

    }

    public static function getFormFieldMap(): array
    {
        return [
            Text::getType()        => Text::class,
            Number::getType()       => Number::class,
            Phone::getType()        => Phone::class,
            Email::getType()        => Email::class,
            Url::getType()          => Url::class,
            TextArea::getType()     => Textarea::class,
            Select::getType()       => Select::class,
            Checkbox::getType()     => Checkbox::class,
            Checkboxes::getType()   => Checkboxes::class,
            Radio::getType()        => Radio::class,
            SubmitButton::getType() => SubmitButton::class,
            FileUpload::getType()   => FileUpload::class,
            Title::getType()        => Title::class,
            Image::getType()        => Image::class,
            Paragraph::getType()    => Paragraph::class,
            Html::getType()         => Html::class,
            Recaptcha::getType()    => Recaptcha::class,
            Hcaptcha::getType()     => Hcaptcha::class,
        ];
    }

}