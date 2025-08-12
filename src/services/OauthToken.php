<?php

namespace craftyfm\formbuilder\services;

use craft\base\Component;
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

        if ($token->id === null) {
            $record = new IntegrationTokenRecord();
        } else {
            $record = IntegrationTokenRecord::findOne(['id' => $token->id]);
            if (!$record) {
                throw new Exception('Invalid Oauth Token ID: ' . $token->id);
            }
        }

        $record->setAttributes($token->toArray());
        return $record->save();
    }

}