<?php

namespace craftyfm\formbuilder\models\submission_fields;

use craft\helpers\DateTimeHelper;
use craft\helpers\Db;
use DateTime;

class DateField extends BaseField
{
    private ?DateTime $_value = null;

    public function __toString() : string
    {
        return (string) $this->getValue()?->format('Y-m-d');

    }
    public function compileSaveData(): string
    {
        return Db::prepareDateForDb($this->getValue());
    }

    /**
     * @throws \Exception
     */
    public function setValue($value): void
    {
        if ($value instanceof DateTime) {
            $this->_value = $value;
            return;
        }
        if (empty($value)) {
            $this->_value = null;
            return;
        }
        $this->_value = DateTimeHelper::toDateTime($value, false, false);
    }

    public function getValue(): ?DateTime
    {
        return $this->_value;
    }

    /**
     * @throws \Exception
     */
    public function setDraftValues($value): void
    {
        $this->setValue($value);
    }

    public function getValueAsJson($encode = false): DateTime|string|null
    {
        $value = $this->getValue()->format('Y-m-d');
        return $encode ? json_encode($value) : $value;
    }
}