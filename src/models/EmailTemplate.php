<?php

namespace craftyfm\formbuilder\models;

use craft\base\Model;
use craft\helpers\UrlHelper;
use craftyfm\formbuilder\records\EmailTemplateRecord;
use DateTime;

class EmailTemplate extends Model
{
    public ?int $id = null;
    public ?string $name = null;
    public ?string $handle = null;
    public ?string $template = null;
    public ?string $uid = null;
    public ?DateTime $dateUpdated = null;
    public ?DateTime $dateCreated = null;

    public function getCpEditUrl(): string
    {
        if (!$this->uid) {
            return '';
        }
        return UrlHelper::cpUrl('form-builder/settings/email-templates/' . $this->uid);
    }

    public function defineRules(): array
    {
        $rules = [];
        $rules[] = [['name', 'handle', 'template'], 'string'];
        $rules[] = [['name', 'handle', 'template'], 'required'];
        $rules[] = [
            'handle',
            'unique',
            'targetClass' => EmailTemplateRecord::class,
            'targetAttribute' => 'handle',
            'filter' => function($query) {
                if ($this->id !== null) {
                    $query->andWhere(['not', ['id' => $this->id]]);
                }
            },
            'message' => 'Handle must be unique.'
        ];
        return $rules;
    }

    public function getConfig(): array
    {
        return [
            'name' => $this->name,
            'handle' => $this->handle,
            'template' => $this->template,
        ];
    }
}