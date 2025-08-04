<?php

namespace craftyfm\formbuilder\services;

use craft\base\Component;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\integrations\captcha\BaseCaptcha;
use craftyfm\formbuilder\integrations\captcha\HCaptcha;
use craftyfm\formbuilder\integrations\captcha\ReCaptcha;

/**
 * Captcha Manager Service
 */
class CaptchaManager extends Component
{
    /**
     * @var array Available captcha integrations
     */
    private array $integrations = [
        'recaptcha' => ReCaptcha::class,
        'hcaptcha' => HCaptcha::class,
    ];

    /**
     * Get all available captcha providers
     */
    public function getAvailableProviders(): array
    {
        $providers = ['none' => 'None'];

        foreach ($this->integrations as $key => $class) {
            /** @var BaseCaptcha $instance */
            $instance = new $class([]);
            $providers[$key] = $instance->getName();
        }

        return $providers;
    }

    /**
     * Get captcha instance by provider
     * @param string $provider
     * @return BaseCaptcha|null
     */
    public function getCaptcha(string $provider): ?BaseCaptcha
    {
        if (!isset($this->integrations[$provider])) {
            return null;
        }

        $settings = FormBuilder::getInstance()->getSettings();
        $config = $settings->getCaptchaConfig($provider);

        $class = $this->integrations[$provider];
        return new $class($config);
    }

    /**
     * Get the active captcha instance
     */
    public function getActiveCaptcha(): ?BaseCaptcha
    {
        $settings = FormBuilder::getInstance()->getSettings();
        $activeProvider = $settings->getActiveCaptchaProvider();

        if (!$activeProvider) {
            return null;
        }

        $captcha = $this->getCaptcha($activeProvider);
        return ($captcha && $captcha->shouldDisplay()) ? $captcha : null;
    }

    /**
     * Verify captcha token using active provider
     */
    public function verify(string $token, ?string $remoteIp = null): bool
    {
        $captcha = $this->getActiveCaptcha();
        return $captcha && $captcha->verify($token, $remoteIp);
    }

    /**
     * Check if any captcha is enabled and configured
     */
    public function isEnabled(): bool
    {
        return $this->getActiveCaptcha() !== null;
    }
}