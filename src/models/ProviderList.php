<?php

namespace craftyfm\formbuilder\models;


use craft\base\Model;

class ProviderList  extends Model
{
    public string $id = '';
    public ?string $name = null;

    /** @var ProviderField[]  */
    public array $fields = [];

    public function __construct($config = [])
    {
        if (isset($config['fields'])) {
            $fields = [];
            foreach ($config['fields'] as $field) {
                if ($field instanceof ProviderField) {
                    $fields[] = $field;
                    continue;
                }
                $fields[] = new ProviderField($field);
            }
            $config['fields'] = $fields;
        }
        parent::__construct($config);
    }
}