<?php

namespace craftyfm\formbuilder\records;

use craft\db\ActiveRecord;
use craftyfm\formbuilder\helpers\Table;
use DateTime;

/**
 * Form record
 *
 * @property int $id
 * @property string $name
 * @property string $handle
 * @property array|null $settings
 * @property DateTime $dateCreated
 * @property DateTime $dateUpdated
 * @property string $uid
 * @property mixed|null $type
 * @property mixed|null $enabled
 *
 */
class IntegrationRecord extends ActiveRecord
{
    public static function tableName(): string
    {
        return Table::INTEGRATIONS;
    }

}
