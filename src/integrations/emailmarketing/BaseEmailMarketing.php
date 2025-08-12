<?php

namespace craftyfm\formbuilder\integrations\emailmarketing;

use craftyfm\formbuilder\integrations\base\BaseIntegration;
use craftyfm\formbuilder\models\IntegrationResult;
use craftyfm\formbuilder\models\Submission;
use yii\db\Exception;

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

    abstract protected function fetchLists();

    /**
     * @throws Exception
     */
    public function getLists(bool $refresh = false): array
    {
        if (!$refresh && isset($this->metadata['lists'])) {
            return $this->metadata['lists'];
        }
        $lists =  $this->fetchLists();

        $this->metadata['lists'] = $lists;
        $this->saveMetadata();
        return $lists;
    }
}