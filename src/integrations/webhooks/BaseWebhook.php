<?php

namespace craftyfm\formbuilder\integrations\webhooks;

use Craft;
use craft\helpers\UrlHelper;
use craftyfm\formbuilder\integrations\base\BaseIntegration;
use craftyfm\formbuilder\models\IntegrationResult;
use craftyfm\formbuilder\models\Submission;

abstract class BaseWebhook extends BaseIntegration
{
    public ?string $webhookUrl = null;
    public function getTypeName(): string
    {
        return 'Webhooks';
    }
    public function getType(): string
    {
        return self::TYPE_WEBHOOK;
    }

    protected function defineSettingAttributes(): array
    {
        $attributes = parent::defineSettingAttributes();
        $attributes[] = 'webhookUrl';
        return $attributes;
    }

    protected function defineSettingRules(): array
    {
        $rules = parent::defineSettingRules();
        $rules[] = [['webhookUrl'], 'required'];
        $rules[] = [['webhookUrl'], 'url'];
        return $rules;
    }




    protected function executeIntegration(Submission $submission): IntegrationResult
    {
        // TODO: Implement executeIntegration() method.
        return new IntegrationResult();
    }
}