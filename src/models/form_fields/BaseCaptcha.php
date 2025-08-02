<?php

namespace craftyfm\formbuilder\models\form_fields;
use craftyfm\formbuilder\integrations\captcha\BaseCaptcha as BaseCaptchaIntegration;
abstract class BaseCaptcha extends Base
{
    abstract public function getCaptchaIntegration(): BaseCaptchaIntegration;
    abstract public function getSiteKey();
    abstract public function getSecretKey();
}