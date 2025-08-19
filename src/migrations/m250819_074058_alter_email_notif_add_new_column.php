<?php

namespace craftyfm\formbuilder\migrations;

use Craft;
use craft\db\Migration;
use craftyfm\formbuilder\helpers\Table;

/**
 * m250819_074058_alter_email_notif_add_new_column migration.
 */
class m250819_074058_alter_email_notif_add_new_column extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp(): bool
    {
        if (!$this->db->columnExists(Table::EMAIL_NOTIF, 'templateId')) {
            $this->addColumn(Table::EMAIL_NOTIF, 'templateId', $this->integer()->null()->after('message'));
            $this->addForeignKey(
                null,
                Table::EMAIL_NOTIF,
                'templateId',
                Table::EMAIL_TEMPLATES,
                'id',
                'SET NULL',
                null
            );
        }

        $this->renameColumn(Table::EMAIL_NOTIF, 'type', 'type_old');
        $this->addColumn(
            Table::EMAIL_NOTIF,
            'type',
            $this->enum('type', ['admin', 'user'])->notNull()->defaultValue('admin')->after('enabled')
        );

        $this->update(Table::EMAIL_NOTIF, ['type' => 'admin'], ['type_old' => 'notification']);
        $this->update(Table::EMAIL_NOTIF, ['type' => 'user'], ['type_old' => 'autoresponder']);

        $this->dropColumn(Table::EMAIL_NOTIF, 'type_old');
        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown(): bool
    {
        echo "m250819_074058_alter_email_notif_add_new_column cannot be reverted.\n";
        return false;
    }
}
