<?php

namespace craftyfm\formbuilder\migrations;

use Craft;
use craft\db\Migration;
use craftyfm\formbuilder\helpers\Table;
use yii\base\Exception;

/**
 * m250812_073058_add_metadata_in_integrations migration.
 */
class m250812_073058_add_metadata_in_integrations extends Migration
{
    /**
     * @inheritdoc
     * @throws Exception
     */
    public function safeUp(): bool
    {
        // Place migration code here...
        if (!$this->db->columnExists(Table::INTEGRATIONS, 'metadata')) {
            $this->addColumn(Table::INTEGRATIONS, 'metadata', $this->json()->null()->after('settings'));
        }

        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown(): bool
    {
        echo "m250812_073058_add_metadata_in_integrations cannot be reverted.\n";
        return false;
    }
}
