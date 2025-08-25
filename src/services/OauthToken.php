<?php

namespace craftyfm\formbuilder\services;

use craft\base\Component;
use craft\helpers\Db;
use craftyfm\formbuilder\models\oauth\Token;
use craftyfm\formbuilder\records\IntegrationTokenRecord;
use GuzzleHttp\Exception\RequestException;
use yii\base\Exception;

class OauthToken extends Component
{

    public function getOauthTokenForIntegration(int $integrationId): ?Token
    {
        $record = IntegrationTokenRecord::findOne(['integrationId' => $integrationId]);
        if (!$record) {
            return null;
        }
        return new Token($record->toArray());
    }


    /**
     * @throws Exception
     */
    public function saveOauthToken(Token $token, bool $runValidation = true): bool
    {
        if ($runValidation && !$token->validate()) {
            return false;
        }

        $record = IntegrationTokenRecord::findOne([
           'integrationId' => $token->integrationId
        ]);

        if (!$record) {
            $record = new IntegrationTokenRecord();
        }
        $record->provider = $token->provider;
        $record->reference = $token->reference;
        $record->tokenType = $token->tokenType;
        $record->accessToken = $token->accessToken;
        $record->refreshToken = $token->refreshToken;
        $record->dateExpired = Db::prepareDateForDb($token->dateExpired);
        $record->scopes = $token->scopes;
        $record->integrationId = $token->integrationId;
        return $record->save();
    }

}