<?php

namespace craftyfm\formbuilder\records;

use craft\db\ActiveRecord;
use craftyfm\formbuilder\helpers\Table;

/**
 * @property mixed|null $name
 * @property mixed|null $handle
 * @property mixed|null $color
 * @property mixed|null $description
 * @property false|mixed|null $isDefault
 */
class SubmissionStatusRecord extends ActiveRecord
{
    public static function tableName(): string
    {
        return Table::SUBMISSION_STATUSES;
    }
}