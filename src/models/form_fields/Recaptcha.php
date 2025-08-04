<?php

namespace craftyfm\formbuilder\models\form_fields;

use craft\base\Model;
use craft\helpers\App;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\integrations\captcha\BaseCaptcha as BaseCaptchaIntegration;

class Recaptcha extends BaseCaptcha
{
    public static string $type = 'recaptcha';
    private BaseCaptchaIntegration $captchaIntegration;
    public function __construct($form, $config = [])
    {
        parent::__construct($form, $config);
    }

    public function getSiteKey(): string
    {
        $key = FormBuilder::getInstance()->getSettings()->captchas['recaptcha']['siteKey'];
        return App::parseEnv($key);
    }

    public function getSecretKey(): string
    {
        $key = FormBuilder::getInstance()->getSettings()->captchas['recaptcha']['secretKey'];
        return App::parseEnv($key);
    }

    public function getCaptchaIntegration(): BaseCaptchaIntegration
    {
        if (isset($this->captchaIntegration)) {
            return $this->captchaIntegration;
        }
        $this->captchaIntegration = new \craftyfm\formbuilder\integrations\captcha\ReCaptcha([
            'siteKey' => $this->getSiteKey(),
            'secretKey' => $this->getSecretKey(),
            'errorMessage' => $this->_getErrorMessage(),
        ]);
        return $this->captchaIntegration;
    }

    private function _getErrorMessage(): string
    {
        return FormBuilder::getInstance()->getSettings()->captchas['recaptcha']['errorMessage'];
    }
}