<?php

namespace craftyfm\formbuilder\migrations;

use Craft;
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
                'enabled' => $this->boolean()->notNull()->defaultValue(false),
                'type' => $this->enum('type', ['notification', 'autoresponder'])->notNull()->defaultValue('notification'),
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
                'enabled' => $this->boolean()->defaultValue(true),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]);
        }
        $this->createIndex('idx_handle', Table::INTEGRATIONS, 'handle', true);
        $this->createIndex('idx_handle', Table::SUBMISSIONS, 'formId');
        $this->createIndex('idx_handle', Table::EMAIL_NOTIF, 'formId');
        $this->createIndex('idx_handle', Table::FORMS, 'handle', true);
        $this->createIndex('idx_handle', Table::SUBMISSION_STATUSES, 'handle', true);


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
        return true;
    }

    public function safeDown(): bool
    {
        $this->dropTableIfExists(Table::INTEGRATIONS);
        $this->dropTableIfExists(Table::EMAIL_NOTIF);
        $this->dropTableIfExists(Table::SUBMISSIONS);
        $this->dropTableIfExists(Table::SUBMISSION_STATUSES);
        $this->dropTableIfExists(Table::FORMS);
        return true;
    }
}
