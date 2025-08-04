<?php

namespace craftyfm\formbuilder\models;

use craft\base\Model;

class Integration extends Model
{

    public ?int $id = null;
    public ?string $name = null;
    public ?string $handle = null;
    public bool $enabled = true;
    public ?string $type = null;
    public ?array $settings = null;
    public ?string $uid = null;

}