<?php

namespace craftyfm\formbuilder\records;

use craft\db\ActiveQuery;
use craft\db\ActiveRecord;
use craftyfm\formbuilder\helpers\Table;
use DateTime;

/**
 * @property int $id
 * @property string $provider
 * @property string|null $reference
 * @property string $accessToken
 * @property string $tokenType
 * @property string|null $refreshToken
 * @property DateTime|null $dateExpired
 * @property string|null $scopes
 * @property int|null $integrationId
 * @property DateTime $createdAt
 * @property DateTime $updatedAt
 *
 * @property IntegrationRecord $integration
 */
class IntegrationTokenRecord extends ActiveRecord
{
    public static function tableName(): string
    {
        return Table::INTEGRATION_OAUTH_TOKEN;
    }

    /**
     * Relation to the parent integration record
     */
    public function getIntegration(): ActiveQuery
    {
        return $this->hasOne(IntegrationRecord::class, ['id' => 'integrationId']);
    }
}