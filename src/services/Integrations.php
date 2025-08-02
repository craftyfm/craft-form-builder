<?php

namespace craftyfm\formbuilder\services;

use Craft;
use craft\base\Component;
use craft\errors\MissingComponentException;
use craft\events\ConfigEvent;
use craft\helpers\Component as ComponentHelper;
use craft\helpers\Db;
use craft\helpers\Json;
use craft\helpers\ProjectConfig as ProjectConfigHelper;
use craft\helpers\StringHelper;
use craftyfm\formbuilder\events\RegisterIntegrationEvent;
use craftyfm\formbuilder\events\SubmissionEvent;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\helpers\Table;
use craftyfm\formbuilder\integrations\base\BaseIntegration;
use craftyfm\formbuilder\integrations\base\IntegrationInterface;
use craftyfm\formbuilder\integrations\webhooks\GenericWebhook;
use craftyfm\formbuilder\records\IntegrationRecord;
use Exception;
use Throwable;
use yii\base\InvalidConfigException;
use yii\db\StaleObjectException;

class Integrations extends Component
{
    public const CONFIG_KEY = 'formBuilder.integrations';
    public const EVENT_REGISTER_INTEGRATIONS = 'registerIntegrations';

    public function getAllIntegrationTypes(): array
    {
        $integrationTypes = [];
        $integrationTypes[BaseIntegration::TYPE_WEBHOOK] = [
            GenericWebhook::class,
        ];
        $integrationTypes[BaseIntegration::TYPE_MISC] = [

        ];

        if ($this->hasEventHandlers(self::EVENT_REGISTER_INTEGRATIONS)) {
            $event = new RegisterIntegrationEvent([
                'types' => $integrationTypes,
            ]);
            $this->trigger(self::EVENT_REGISTER_INTEGRATIONS, $event);

            $integrationTypes = $event->types;
        }

        return $integrationTypes;
    }

    public function getIntegrationProviderForType(string $type): array
    {
        return $this->getAllIntegrationTypes()[$type] ?? [];
    }

    /**
     * @throws Exception
     */
    public function saveIntegration(IntegrationInterface $integration, bool $runValidation = true): bool
    {
        $isNewIntegration = $integration->getIsNew();

        if (!$integration->beforeSave($isNewIntegration)) {
            return false;
        }

        if ($runValidation && !$integration->validate()) {
            FormBuilder::log('Integration not saved due to validation error.', 'info');
            return false;
        }

        if ($isNewIntegration) {
            $integration->uid = StringHelper::UUID();
        } else if (!$integration->uid) {
            $integration->uid = Db::uidById(Table::INTEGRATIONS, $integration->id);
        }

        $configPath = self::CONFIG_KEY . '.' . $integration->uid;
        $data = $this->createConfig($integration);

        Craft::$app->getProjectConfig()->set($configPath, $data, "Save the “{$integration->handle}” status");

        if ($isNewIntegration) {
            $integration->id = Db::idByUid(Table::INTEGRATIONS, $integration->uid);
        }
        return true;
    }

    /**
     * @throws Exception
     */
    public function handleChangedIntegration(ConfigEvent $event): void
    {
        $integrationUid = $event->tokenMatches[0];
        $data = $event->newValue;

        $record = IntegrationRecord::findOne(['uid' => $integrationUid]);
        $isNew = false;
        if (!$record) {
            $isNew = true;
            $record = new IntegrationRecord();
        }
        $record->name = $data['name'];
        $record->handle = $data['handle'];
        $record->type = $data['type'];
        $record->enabled = $data['enabled'];
        $record->settings = ProjectConfigHelper::unpackAssociativeArrays($data['settings']);
        $record->uid = $integrationUid;
        if (!$record->save(false)) {
            return;
        }

        $integration = $this->getIntegrationById($record->id);
        $integration->afterSave($isNew);

    }

    /**
     * @throws InvalidConfigException
     * @throws MissingComponentException
     */
    public function getAllIntegrations(): array
    {
        $records = IntegrationRecord::find()->all();
        $integrations = [];
        foreach ($records as $record) {
            $integrations[] = $this->constructIntegration($record->toArray());
        }
        return $integrations;
    }

    /**
     * @return IntegrationInterface[]
     * @throws InvalidConfigException
     * @throws MissingComponentException
     */
    public function getEnabledIntegrations(): array
    {
        $query = IntegrationRecord::find();
        $query->where(['enabled' => true]);
        $records = $query->all();
        $integrations = [];
        foreach ($records as $record) {
            $integrations[] = $this->constructIntegration($record->toArray());
        }
        return $integrations;
    }

    /**
     * @throws InvalidConfigException
     * @throws MissingComponentException
     */
    public function getIntegrationById(int $id): ?IntegrationInterface
    {
        $record = IntegrationRecord::findOne(['id' => $id]);
        if (!$record) {
            return null;
        }
        return $this->constructIntegration($record->toArray());
    }

    public function runIntegration($integration, $submission): void
    {
        $integration->execute($submission);
    }

    public function deleteIntegration(IntegrationInterface $integration): bool
    {
        if (!$integration->beforeDelete()) {
            return false;
        }
        $uid = $integration->uid;
        Craft::$app->projectConfig->remove(self::CONFIG_KEY . '.' . $uid);
        return true;
    }

    /**
     * @param ConfigEvent $event
     * @throws InvalidConfigException
     * @throws MissingComponentException
     * @throws Throwable
     * @throws StaleObjectException
     */
    public function handleDeletedIntegration(ConfigEvent $event): void
    {
        $uid = $event->tokenMatches[0];
        $record = IntegrationRecord::findOne(['uid' => $uid]);
        if ($record->getIsNewRecord()) {
            return;
        }

        $integration = $this->getIntegrationById($record->id);
        if (!$integration->beforeDelete()) {
            return;
        }

        if(!$record->delete()) {
            return;
        }
        $integration->afterDelete();
    }

    /**
     * @throws InvalidConfigException
     * @throws MissingComponentException
     */
    public function constructIntegration(array $config): BaseIntegration
    {
        if (isset($config['settings']) && is_string($config['settings'])) {
            $config['settings'] = Json::decode($config['settings']);
        }

        return ComponentHelper::createComponent($config, IntegrationInterface::class);
    }

    public function createConfig(IntegrationInterface $integration): array
    {
        return [
            'name' => $integration->name,
            'handle' => $integration->handle,
            'type' => get_class($integration),
            'enabled' => $integration->enabled,
            'settings' => ProjectConfigHelper::packAssociativeArrays($integration->getSettings()),
        ];
    }



}