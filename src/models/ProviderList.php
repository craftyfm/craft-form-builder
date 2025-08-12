<?php

namespace craftyfm\formbuilder\models;


use craft\base\Model;

class ProviderList  extends Model
{
    public string $id = '';
    public ?string $name = null;

    /** @var ProviderField[]  */
    public array $fields = [];
}