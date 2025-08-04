<?php

namespace craftyfm\formbuilder\records;

use craft\db\ActiveRecord;
use craftyfm\formbuilder\helpers\Table;

/**
 * Form record
 *
 * @property int $id
 * @property int $formId
 * @property string $recipients
 * @property string $subject
 * @property string $message
 * @property bool $enabled
 * @property string $type
 * @property string $uid
 *
 */
class EmailNotificationRecord extends ActiveRecord
{
    public static function tableName(): string
    {
        return Table::EMAIL_NOTIF;
    }

}
