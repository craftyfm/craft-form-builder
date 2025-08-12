<?php

namespace craftyfm\formbuilder\services;

use craft\base\Component;
use craft\db\Query;
use craft\errors\MissingComponentException;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\helpers\Table;
use craftyfm\formbuilder\integrations\base\BaseIntegration;
use craftyfm\formbuilder\records\FormIntegration;
use yii\base\InvalidConfigException;
use yii\db\Exception;

class FormIntegrations extends Component
{

    /**
     * @throws InvalidConfigException
     * @throws MissingComponentException
     */
    public function getIntegrationsForForm(int $formId): array
    {
        $results = $this->_buildEnabledIntegrationsWithFormSettingsQuery($formId)
            ->all();
        $integrations = [];
        foreach ($results as $result) {
            unset($result['integrationEnabled']);
            $result['formSettings'] = $result['formSettings'] ? json_decode($result['formSettings'], true) : [];
            $integration = FormBuilder::getInstance()->integrations->constructIntegration($result);
            $integration->setScenario(BaseIntegration::SCENARIO_FORM_SETTINGS);
            $integrations[$integration->handle] = $integration;
        }



        return $integrations;
    }

    /**
     * @throws Exception
     */
    public function saveFormIntegration(int $formId, BaseIntegration $integration, bool $runValidate = true): bool
    {
        $record = FormIntegration::findOne([
            'formId' => $formId,
            'integrationId' => $integration->id
        ]);
        if (!$record) {
            $record = new FormIntegration();
            $record->formId = $formId;
            $record->integrationId = $integration->id;
        }

        $record->enabled = $integration->enabled;
        $record->settings = $integration->getSettings();
        return $record->save($runValidate);
    }


    private function _buildEnabledIntegrationsWithFormSettingsQuery(int $formId): Query
    {
        return (new Query())
            ->select([
                // Integration columns except dateCreated/dateUpdated
                'i.id',
                'i.name',
                'i.handle',
                'i.type',
                'i.metadata',
                'i.settings',
                'i.enabled AS integrationEnabled',

                // From formIntegration
                'fi.enabled',
                'fi.settings as formSettings',
            ])
            ->from(['i' => Table::INTEGRATIONS])
            ->leftJoin(
                ['fi' => Table::FORM_INTEGRATION],
                '[[fi.integrationId]] = [[i.id]] AND [[fi.formId]] = :formId',
                [':formId' => $formId]
            )
            ->where(['i.enabled' => 1]);
    }

}