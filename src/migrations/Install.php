<?php

namespace craftyfm\formbuilder\migrations;

use craft\db\Migration;
use craftyfm\formbuilder\helpers\Table;
use yii\base\Exception;

/**
 * Install migration.
 */
class Install extends Migration
{
    /**
     * @throws Exception
     */
    public function safeUp(): bool
    {

        if (!$this->db->tableExists(Table::FORMS)) {
            $this->createTable(Table::FORMS, [
                'id' => $this->primaryKey(),
                'name' => $this->string()->notNull(),
                'handle' => $this->string()->unique()->notNull(),
                'settings' => $this->json()->null(),
                'fields' => $this->json()->null(),
                'integrations' => $this->json()->null(),
                'authorId' => $this->integer()->null(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]);
        }

        if (!$this->db->tableExists(Table::SUBMISSIONS)) {
            $this->createTable(Table::SUBMISSIONS, [
                'id' => $this->primaryKey(),
                'content' => $this->json()->null(),
                'formId' => $this->integer()->notNull(),
                'statusId' => $this->integer(),
                'ipAddress' => $this->string()->null(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]);
        }

        if (!$this->db->tableExists(Table::SUBMISSION_STATUSES)) {
            $this->createTable(Table::SUBMISSION_STATUSES, [
                'id' => $this->primaryKey(),
                'name' => $this->string()->notNull(),
                'handle' => $this->string()->notNull(),
                'color' => $this->string()->notNull(),
                'description' => $this->text(),
                'isDefault' => $this->boolean()->defaultValue(false),
                'uid' => $this->uid(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
            ]);
        }

        if (!$this->db->tableExists(Table::EMAIL_NOTIF)) {
            $this->createTable(Table::EMAIL_NOTIF, [
                'id' => $this->primaryKey(),
                'formId' => $this->integer()->notNull(),
                'recipients' => $this->text()->null(),
                'subject' => $this->string()->null(),
                'message' => $this->text()->null(),
                'templateId' => $this->integer()->null(),
                'enabled' => $this->boolean()->notNull()->defaultValue(false),
                'type' => $this->enum('type', ['admin', 'user'])->notNull()->defaultValue('admin'),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]);
        }
        if (!$this->db->tableExists(Table::INTEGRATIONS)) {
            $this->createTable(Table::INTEGRATIONS, [
                'id' => $this->primaryKey(),
                'name' => $this->string()->notNull(),
                'handle' => $this->string()->notNull(),
                'type' => $this->string()->notNull(),
                'settings' => $this->json(),
                'metadata' => $this->json()->null(),
                'enabled' => $this->boolean()->defaultValue(true),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]);
        }

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
        }

        if (!$this->db->tableExists(Table::EMAIL_TEMPLATES)) {
            $this->createTable(Table::EMAIL_TEMPLATES, [
                'id' => $this->primaryKey(),
                'name' => $this->string()->notNull(),
                'handle' => $this->string()->notNull(),
                'template' => $this->string()->notNull(),
                'uid' => $this->uid(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
            ]);
        }

        $this->createIndex('idx_handle', Table::INTEGRATIONS, 'handle', true);
        $this->createIndex('idx_handle', Table::SUBMISSIONS, 'formId');
        $this->createIndex('idx_handle', Table::EMAIL_NOTIF, 'formId');
        $this->createIndex('idx_handle', Table::FORMS, 'handle', true);
        $this->createIndex('idx_handle', Table::SUBMISSION_STATUSES, 'handle', true);
        $this->createIndex(
            null,
            Table::INTEGRATION_OAUTH_TOKEN,
            ['integrationId', 'provider', 'reference'],
            true
        );
        $this->createIndex(
            null,
            Table::FORM_INTEGRATION,
            ['integrationId', 'formId'],
            false
        );

            // Add foreign key to thankyou page
        $this->addForeignKey(
            null,
            '{{%formbuilder_forms}}',
            'authorId',
            '{{%users}}',
            'id',
            'SET NULL',
            'CASCADE'
        );

        $this->addForeignKey(
            null,
            Table::EMAIL_NOTIF,
            'formId',
            Table::FORMS,
            'id',
            'CASCADE',
            'CASCADE'
        );

        $this->addForeignKey(
            null,
            Table::SUBMISSIONS,
            'formId',
            Table::FORMS,
            'id',
            'CASCADE',
            'CASCADE'
        );

        $this->addForeignKey(
            null,
            Table::SUBMISSIONS,
            'statusId',
            Table::SUBMISSION_STATUSES,
            'id',
            'SET NULL',
            'CASCADE'
        );

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

        $this->addForeignKey(
            null,
            Table::INTEGRATION_OAUTH_TOKEN,
            'integrationId',
            Table::INTEGRATIONS,
            'id',
            'CASCADE',
            null
        );

        $this->addForeignKey(
            null,
            Table::EMAIL_NOTIF,
            'templateId',
            Table::EMAIL_TEMPLATES,
            'id',
            'SET NULL',
            null
        );

        return true;
    }

    public function safeDown(): bool
    {
        $this->dropTableIfExists(Table::INTEGRATIONS);
        $this->dropTableIfExists(Table::EMAIL_NOTIF);
        $this->dropTableIfExists(Table::SUBMISSIONS);
        $this->dropTableIfExists(Table::SUBMISSION_STATUSES);
        $this->dropTableIfExists(Table::FORMS);
        $this->dropTableIfExists(Table::INTEGRATION_OAUTH_TOKEN);
        $this->dropTableIfExists(Table::FORM_INTEGRATION);
        $this->dropTableIfExists(Table::EMAIL_TEMPLATES);
        return true;
    }
}
