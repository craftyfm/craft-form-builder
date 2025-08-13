<?php

namespace craftyfm\formbuilder\integrations\emailmarketing;

use craftyfm\formbuilder\integrations\base\BaseIntegration;
use craftyfm\formbuilder\models\Form;
use craftyfm\formbuilder\models\ProviderList;
use yii\db\Exception;

abstract class BaseEmailMarketing extends BaseIntegration
{
    public array $fieldMapping = [];
    public ?string $listId = null;

    public function setMetadata(array $metadata): void
    {
        if (isset($metadata['lists'])) {
            $lists = [];
            foreach ($metadata['lists'] as $list) {
                $lists[] = new ProviderList($list);
            }
            $metadata['lists'] = $lists;
        };
        parent::setMetadata($metadata);
    }
    protected function defineFormSettingAttributes(): array
    {
        $attributes = parent::defineFormSettingAttributes();
        $attributes[] = 'listId';
        $attributes[] = 'fieldMapping';
        return $attributes;
    }

    /**
     * @throws Exception
     */
    public function setFormSettings(array $settings): void
    {
        parent::setFormSettings($settings);
    }
    public function getTypeName(): string
    {
        return 'Email Marketing';
    }
    public function getType(): string
    {
        return self::TYPE_EMAIL_MARKETING;
    }

    /**
     * @throws Exception
     */
    public function normalizeFormSettings(Form $form): void
    {
        $this->normalizeFieldMapping($form);
    }

    /**
     * @throws Exception
     */
    protected function getCurrentList(): ?ProviderList
    {
        $lists = $this->getLists();
        $listId = $this->listId;
        $matchedList = array_filter($lists, function ($list) use ($listId) {
            return isset($list['id']) && $list['id'] === $listId;
        });
        return reset($matchedList);
    }
    /**
     * @throws Exception
     */
    protected function normalizeFieldMapping(Form $form): void
    {
        if ($this->listId === null) {
            $this->fieldMapping = [];
            return;
        }

        $currentList = $this->getCurrentList();

        if (!$currentList) {
            $this->fieldMapping = [];
            return;
        }

        $fieldMapping = [];
        $selectedFields = $currentList->fields;
        foreach ($selectedFields as $field) {
            if (!isset($this->fieldMapping[$field->handle]) ) {
                continue;
            }
            $formFieldId = $this->fieldMapping[$field->handle];
            $formField = $form->getFieldById($formFieldId);
            if (!$formField) {
                continue;
            }
            $fieldMapping[$field->handle] = $formField->id;
        }

        $this->fieldMapping = $fieldMapping;
    }

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

    abstract protected function fetchLists();
}