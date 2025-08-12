<?php

namespace craftyfm\formbuilder\integrations\emailmarketing;

use Craft;
use craft\helpers\UrlHelper;
use craftyfm\formbuilder\models\IntegrationResult;
use craftyfm\formbuilder\models\oauth\Oauth2Trait;
use craftyfm\formbuilder\models\Submission;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use yii\base\Exception;

class ConstantContact extends BaseEmailMarketing
{
    use Oauth2Trait;
    public ?string $clientId = null;
    public ?string $clientSecret = null;
    protected static string $version = 'v3';
    protected function defineSettingAttributes(): array
    {
        $attributes = parent::defineSettingAttributes();
        $attributes[] = 'clientId';
        $attributes[] = 'clientSecret';
        return $attributes;
    }

    public function supportOauth2Authorize(): bool
    {
        return true;

    }

    public function supportOauthConnection(): bool
    {
        return true;
    }

    public function getBaseApiUrl(): string
    {
        return 'https://api.cc.email/' . self::$version;
    }

    public function getBaseAuthUrl(): string
    {
        return 'https://authz.constantcontact.com/oauth2/default/v1/authorize';
    }

    public function getBaseTokenUrl(): string
    {
        return 'https://authz.constantcontact.com/oauth2/default/v1/token';
    }

    public function getScopes(): string|array
    {
        return 'contact_data offline_access';
    }

    public function getState(): ?string
    {
        return $this->uid;
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

    /**
     * @throws SyntaxError
     * @throws Exception
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function getFormSettingsHtml(): string
    {
        $view = Craft::$app->getView();

        return $view->renderTemplate('form-builder/_integrations/email-marketing/constant-contact/form-settings', [
            'integration' => $this,
        ]);
    }
    protected function executeIntegration(Submission $submission): IntegrationResult
    {
        // TODO: Implement executeIntegration() method.

        return new IntegrationResult();
    }
}