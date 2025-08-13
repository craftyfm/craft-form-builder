<?php

namespace craftyfm\formbuilder\models;

use craft\base\Model;

class ProviderField extends Model
{
    public const TYPE_STRING = 'string';
    public const TYPE_INTEGER = 'integer';
    public const TYPE_DATE = 'date';
    const TYPE_DATETIME = 'datetime';

    public string $label = '';
    public string $handle = '';
    public string $type = self::TYPE_STRING;
    public bool $required = false;
    public array $options = [];

}