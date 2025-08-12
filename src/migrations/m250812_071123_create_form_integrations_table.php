<?php

namespace craftyfm\formbuilder\migrations;

use Craft;
use craft\db\Migration;
use craft\db\Query;
use craft\errors\MissingComponentException;
use craft\helpers\Json;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\helpers\Table;
use yii\base\Exception;
use yii\base\InvalidConfigException;
use yii\base\NotSupportedException;

/**
 * m250812_071123_create_form_integrations_table migration.
 */
class m250812_071123_create_form_integrations_table extends Migration
{
    /**
     * @inheritdoc
     * @throws NotSupportedException
     * @throws Exception
     */
    public function safeUp(): bool
    {
        if (!$this->db->tableExists(Table::FORM_INTEGRATION)) {
            $this->createTable(Table::FORM_INTEGRATION, [
                'id' => $this->primaryKey(),
                'integrationId' => $this->integer()->notNull(),
                'formId' => $this->integer()->notNull(),
                'enabled' => $this->boolean()->notNull()->defaultValue(false),
                'settings' => $this->json()->null(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]);

            $this->addForeignKey(
                null,
                Table::FORM_INTEGRATION, 'formId',
                Table::FORMS, 'id',
                'CASCADE', 'CASCADE'
            );

            $this->addForeignKey(
                null,
                Table::FORM_INTEGRATION, 'integrationId',
                Table::INTEGRATIONS, 'id',
                'CASCADE', 'CASCADE'
            );

            $this->createIndex(
                null,
                Table::FORM_INTEGRATION,
                ['integrationId', 'formId'],
                false
            );

        }

        if ($this->db->columnExists(Table::FORMS, 'integrations')) {
            $this->_migrateDate();
            $this->dropColumn(Table::FORMS, 'integrations');
        }



        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown(): bool
    {
        $this->dropTableIfExists(Table::FORM_INTEGRATION);
        return false;
    }


    private function _migrateDate(): void
    {
        $forms = (new Query())
            ->select(['id', 'integrations'])
            ->from(Table::FORMS)
            ->all();

        $integrations = [];
        foreach ($forms as $form) {
            $integrationData = Json::decodeIfJson($form['integrations']);
            if (!is_array($integrationData)) {
                continue;
            }
            foreach ($integrationData as $handle => $settings) {
                $enabled = isset($settings['enabled']) && $settings['enabled'];

                // Remove the enabled key from config
                if (isset($settings['enabled'])) {
                    unset($settings['enabled']);
                }

                if (!isset($integrations[$handle])) {
                    try {
                        $integrations[$handle] = FormBuilder::getInstance()->integrations->getIntegrationByHandle($handle);
                    } catch (MissingComponentException|InvalidConfigException) {
                        continue;
                    }
                }

                if ($integrations[$handle] === null) {
                    continue;
                }
                $this->insert(Table::FORM_INTEGRATION, [
                    'integrationId' => $integrations[$handle]->id,
                    'formId' => $form['id'],
                    'enabled' => $enabled,
                    'config' => Json::encode($settings),
                ]);
            }

        }
    }
}
