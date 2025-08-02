<?php

namespace craftyfm\formbuilder\models;

use Craft;
use craft\base\Model;
use craft\models\Volume;

/**
 * Form Builder Settings model
 */
class Settings extends Model
{
    /**
     * @var int|null The volume ID for file uploads
     */
    public ?int $uploadVolumeId = null;

    /**
     * @var bool Whether rate limiting is enabled
     */
    public bool $enableRateLimit = false;

    /**
     * @var int Maximum submissions per IP address within the time window
     */
    public int $maxAttemptsPerIp = 5;

    /**
     * @var int Time window for rate limiting (in minutes)
     */
    public int $rateLimitTimeWindow = 60;

    /**
     * @var string|null Rate limit error message
     */
    public ?string $rateLimitMessage = null;

    /**
     * @var array Captcha configurations
     */
    public array $captchas = [];

    /**
     * @inheritdoc
     */
    public function init(): void
    {
        parent::init();

        // Set default messages if not provided
        if ($this->rateLimitMessage === null) {
            $this->rateLimitMessage = 'Too many submissions from this IP address. Please try again later.';
        }

        // Initialize default captcha configurations if empty
        if (empty($this->captchas)) {
            $this->captchas = [
                'recaptcha' => [
                    'enabled' => false,
                    'siteKey' => '',
                    'secretKey' => '',
                    'scoreThreshold' => 0.5,
                    'errorMessage' => 'Please complete the reCAPTCHA verification.',
                ],
                'hcaptcha' => [
                    'enabled' => false,
                    'siteKey' => '',
                    'secretKey' => '',
                    'errorMessage' => 'Please complete the hCaptcha verification.',
                ],
            ];
        }
    }

    /**
     * @inheritdoc
     */
    public function rules(): array
    {
        return [
            [['uploadVolumeId'], 'integer'],
            [['enableRateLimit'], 'boolean'],
            [['maxAttemptsPerIp', 'rateLimitTimeWindow'], 'integer', 'min' => 1],
            [['rateLimitMessage'], 'string'],
            [['captchas'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels(): array
    {
        return [
            'uploadVolumeId' => 'Upload Volume',
            'enableRateLimit' => 'Enable Rate Limiting',
            'maxAttemptsPerIp' => 'Max Submissions per IP',
            'rateLimitTimeWindow' => 'Rate Limit Time Window (minutes)',
            'rateLimitMessage' => 'Rate Limit Error Message',
            'captchas' => 'Captcha Configurations',
        ];
    }

    /**
     * Get the upload volume
     */
    public function getUploadVolume(): ?Volume
    {
        if ($this->uploadVolumeId) {
            return Craft::$app->getVolumes()->getVolumeById($this->uploadVolumeId);
        }
        return null;
    }

    /**
     * Get captcha configuration for a provider
     */
    public function getCaptchaConfig(string $provider): array
    {
        return $this->captchas[$provider] ?? [];
    }

    /**
     * Set captcha configuration for a provider
     */
    public function setCaptchaConfig(string $provider, array $config): void
    {
        $this->captchas[$provider] = $config;
    }

    /**
     * Check if a captcha provider is enabled
     */
    public function isCaptchaEnabled(string $provider): bool
    {
        return $this->captchas[$provider]['enabled'] ?? false;
    }

    /**
     * Get the first enabled captcha provider
     */
    public function getActiveCaptchaProvider(): ?string
    {
        foreach ($this->captchas as $provider => $config) {
            if ($config['enabled'] ?? false) {
                return $provider;
            }
        }
        return null;
    }
}