<?php

namespace craftyfm\formbuilder\records;

use craft\db\ActiveRecord;
use craftyfm\formbuilder\helpers\Table;

/**
 * Form record
 *
 * @property int $id
 * @property string $name
 * @property string $handle
 * @property array|null $settings
 * @property array|null $integrations
 * @property int|null $authorId
 * @property array|null $fields
 * @property string $uid
 *
 */
class FormRecord extends ActiveRecord
{
    public static function tableName(): string
    {
        return Table::FORMS;
    }
}
