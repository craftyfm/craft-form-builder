<?php

namespace craftyfm\formbuilder\models;

use craft\base\Model;
use craft\helpers\UrlHelper;

class SubmissionStatus extends Model
{
    public ?int $id = null;
    public ?string $uid = null;
    public ?string $name = null;
    public ?string $handle = null;
    public ?string $color = null;
    public ?string $description = null;
    public bool $isDefault = false;

    public function getCpEditUrl(): string
    {
        return UrlHelper::cpUrl('form-builder/settings/statuses/' . $this->uid);

    }
    public function rules(): array
    {
        return [
            [['name', 'handle', 'color'], 'required'],
            [['name', 'handle', 'color', 'description'], 'string'],
            [['isDefault'], 'boolean'],
        ];
    }

    public function getConfig(): array
    {
        return [
            'name' => $this->name,
            'handle' => $this->handle,
            'color' => $this->color,
            'description' => $this->description,
            'isDefault' => $this->isDefault,
        ];
    }
}
