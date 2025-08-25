<?php

namespace craftyfm\formbuilder\records;

use craft\db\ActiveRecord;
use craftyfm\formbuilder\helpers\Table;

/**
 * @property int $id
 * @property string $name
 * @property string $handle
 * @property string $template
 * @property string $uid
 */
class EmailTemplateRecord extends ActiveRecord
{
    public static function tableName(): string
    {
        return Table::EMAIL_TEMPLATES;
    }
}