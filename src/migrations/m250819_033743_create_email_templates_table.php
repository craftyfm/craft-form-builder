<?php

namespace craftyfm\formbuilder\migrations;

use Craft;
use craft\db\Migration;
use craftyfm\formbuilder\helpers\Table;

/**
 * m250819_033743_create_email_templates_table migration.
 */
class m250819_033743_create_email_templates_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp(): bool
    {
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

        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown(): bool
    {
        $this->dropTableIfExists(Table::EMAIL_TEMPLATES);
        return false;
    }
}
