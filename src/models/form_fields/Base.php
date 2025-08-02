<?php

namespace craftyfm\formbuilder\models\form_fields;

use craft\base\Model;
use craftyfm\formbuilder\models\Form;

abstract class Base extends Model
{
    public ?string $id = null;
    public string $handle = '';
    public int $order;
    protected static bool $isSubmissionField = false;
    public static string $type;
    protected ?Form $_parent = null;

    public function __construct($form, $config = [])
    {
        $this->_parent = $form;
        parent::__construct();
    }

    public static function getType(): string
    {
        return static::$type;
    }

    public function fields(): array
    {
        return array_merge(parent::fields(), [
            'type' => fn() => $this->getType(),
        ]);
    }

    public static function getIsSubmissionField(): bool
    {
        return self::$isSubmissionField;
    }
}