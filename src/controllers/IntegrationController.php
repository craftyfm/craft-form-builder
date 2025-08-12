<?php

namespace craftyfm\formbuilder\controllers;

use Craft;
use craft\errors\MissingComponentException;
use craft\web\Controller;
use craft\web\Response;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\integrations\base\BaseIntegration;
use craftyfm\formbuilder\models\oauth\Oauth2Trait;
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
        $error = $this->request->getParam('error');

        if (!$state) {
            return $this->asFailure("Missing state", [
                'error' => "Missing state"
            ]);
        }

        /** @var Oauth2Trait|BaseIntegration $integration */
        $integration = FormBuilder::getInstance()->integrations->getIntegrationByUid($state);

        if (!$integration) {
            return $this->asFailure("Invalid state", [  'error' => "Invalid state"]);
        }

        if ($error) {
            $errorMessage = "Failed to authorize: " . $error;
            FormBuilder::log($errorMessage, 'error');
            $this->setFailFlash("Failed to authorize: " . $error);
            return $this->redirect($integration->getCpEditUrl());
        }

        if(!$code) {
            $errorMessage = "Failed to authorize: Missing code";
            FormBuilder::log($errorMessage, 'error');
            $this->setFailFlash("Failed to authorize: " . $error);
            return $this->redirect($integration->getCpEditUrl());
        }

        if (!$integration->fetchAccessToken($code)) {
            $errorMessage = "Failed to get the access token";
            $this->setFailFlash($errorMessage);
            return $this->redirect($integration->getCpEditUrl());
        }

        $this->setSuccessFlash("Successful authorize");
        return $this->redirect($integration->getCpEditUrl());
    }
}