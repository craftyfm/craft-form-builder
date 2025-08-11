<?php

namespace craftyfm\formbuilder\integrations\emailmarketing;

use Craft;
use craft\helpers\UrlHelper;
use craftyfm\formbuilder\models\IntegrationResult;
use craftyfm\formbuilder\models\Submission;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use yii\base\Exception;

class ConstantContact extends BaseEmailMarketing
{
    public ?string $clientId = null;
    public ?string $clientSecret = null;

    protected function defineSettingAttributes(): array
    {
        $attributes = parent::defineSettingAttributes();
        $attributes[] = 'clientId';
        $attributes[] = 'clientSecret';
        return $attributes;
    }

    public function getCallbackUri(): string
    {
        return UrlHelper::cpUrl('form-builder/integration/oauth-callback');
    }

    public function getAuthorizationUrl(): string
    {
        return 'https://authz.constantcontact.com/oauth2/default/v1/authorize';
    }

    public function supportAuthorize(): bool
    {
        return true;

    }
    public function supportOauthConnection(): bool
    {
        return true;
    }


    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws Exception
     * @throws LoaderError
     */
    public function getSettingsHtml(): string
    {
        $view = Craft::$app->getView();

        return $view->renderTemplate('form-builder/_integrations/email-marketing/constant-contact/settings', [
            'integration' => $this,
        ]);
    }

    public function defineSettingRules(): array
    {
        $rules = parent::defineSettingRules();
        $rules[] = [['clientId', 'clientSecret'], 'string'];
        $rules[] = [['clientId', 'clientSecret'], 'required'];;
        return $rules;
    }

    protected function executeIntegration(Submission $submission): IntegrationResult
    {
        // TODO: Implement executeIntegration() method.

        return new IntegrationResult();
    }
}