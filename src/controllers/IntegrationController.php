<?php

namespace craftyfm\formbuilder\controllers;

use Craft;
use craft\errors\MissingComponentException;
use craft\web\Controller;
use craft\web\Response;
use craftyfm\formbuilder\FormBuilder;
use GuzzleHttp\Exception\GuzzleException;
use yii\base\InvalidConfigException;

class IntegrationController extends Controller
{
    protected int|bool|array $allowAnonymous = ['oauth-callback'];

    /**
     * @throws GuzzleException
     * @throws InvalidConfigException
     * @throws MissingComponentException
     */
    public function actionOauthCallback(): ?\yii\web\Response
    {
        $code = $this->request->getParam('code');
        $state = $this->request->getParam('state');

        $body = $this->request->getQueryParams();
        dd($body);
        if(!$code) {
            return $this->asFailure("Missing code", [
                'error' => "Missing Auth code"
            ]);
        }

        if (!$state) {
            return $this->asFailure("Missing state", [
                'error' => "Missing state"
            ]);
        }

        $integration = FormBuilder::getInstance()->integrations->getIntegrationByUid($state);

        if (!$integration) {
            return $this->asFailure("Invalid state", [  'error' => "Invalid state"]);
        }

        $client = Craft::createGuzzleClient([
            'timeout' => 10,
        ]);
        $response = $client->post('https://authz.constantcontact.com/oauth2/default/v1/token', [
            'form_params' => [
                'grant_type' => 'authorization_code',
                'client_id' => $integration->clientId,
                'client_secret' => $integration->clientSecret,
                'code' => $code,
                'redirect_uri' => $integration->getCallbackUri(),
            ]
        ]);

        $data = json_decode($response->getBody()->getContents(), true);
        dd($data);
    }
}