<?php

namespace craftyfm\formbuilder\migrations;

use Craft;
use craft\db\Migration;
use craftyfm\formbuilder\helpers\Table;

/**
 * m250811_235754_create_integrations_tokens_table migration.
 */
class m250811_235754_create_integrations_tokens_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp(): bool
    {
        if (!$this->db->tableExists(Table::INTEGRATION_OAUTH_TOKEN)) {
            $this->createTable(Table::INTEGRATION_OAUTH_TOKEN, [
                'id' => $this->primaryKey(),
                'provider' => $this->string()->null(),
                'reference' => $this->string(100)->null(),
                'tokenType' => $this->string(100)->null(),
                'accessToken' => $this->text()->notNull(),
                'refreshToken' => $this->text()->null(),
                'dateExpired' => $this->dateTime()->null(),
                'scopes' => $this->text()->null(),
                'integrationId' => $this->integer()->null(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
            ]);
        }

        $this->addForeignKey(
            null,
            Table::INTEGRATION_OAUTH_TOKEN,
            'integrationId',
            Table::INTEGRATIONS,
            'id',
            'CASCADE',
            null
        );

        $this->createIndex(
            null,
            Table::INTEGRATION_OAUTH_TOKEN,
            ['integrationId', 'provider', 'reference'],
            true
        );


        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown(): bool
    {
        $this->dropTableIfExists(Table::INTEGRATION_OAUTH_TOKEN);
        return false;
    }
}
