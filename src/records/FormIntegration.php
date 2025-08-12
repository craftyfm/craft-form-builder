<?php

namespace craftyfm\formbuilder\records;

use craft\db\ActiveRecord;
use craftyfm\formbuilder\helpers\Table;

/**
 * @property int $formId
 * @property int $integrationId
 * @property bool $enabled
 * @property array $settings
 */
class FormIntegration extends ActiveRecord
{
    public static function tableName():string
    {
        return Table::FORM_INTEGRATION;
    }
}