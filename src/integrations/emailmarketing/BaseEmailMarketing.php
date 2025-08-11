<?php

namespace craftyfm\formbuilder\integrations\emailmarketing;

use craftyfm\formbuilder\integrations\base\BaseIntegration;
use craftyfm\formbuilder\models\IntegrationResult;
use craftyfm\formbuilder\models\Submission;

abstract class BaseEmailMarketing extends BaseIntegration
{
    public array $fieldMapping = [];
    public ?string $listId = null;
    public function getTypeName(): string
    {
        return 'Email Marketing';
    }
    public function getType(): string
    {
        return self::TYPE_EMAIL_MARKETING;
    }
}