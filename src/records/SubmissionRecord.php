<?php

namespace craftyfm\formbuilder\records;

use craft\db\ActiveRecord;
use craftyfm\formbuilder\helpers\Table;
use DateTime;

/**
 * Form record
 *
 * @property int $id
 * @property array $content
 * @property string $formId
 * @property string|null $ipAddress
 * @property DateTime $dateCreated
 * @property DateTime $dateUpdated
 * @property string $uid
 * @property int|null $statusId
 */
class SubmissionRecord extends ActiveRecord
{
    public static function tableName(): string
    {
        return Table::SUBMISSIONS;
    }
}