<?php

namespace craftyfm\formbuilder\integrations\captcha;

use craft\base\Model;
use craft\behaviors\EnvAttributeParserBehavior;
use craft\helpers\App;
use craft\web\Request;

/**
 * Base Captcha Integration
 */
abstract class BaseCaptcha extends Model
{
    /**
     * @var array Configuration from settings
     */
    protected array $config = [];

    /**
     * @var bool Whether this captcha is enabled
     */
    public bool $enabled = false;

    /**
     * @var string Error message for failed verification
     */
    public string $errorMessage = '';

    /**
     * BaseCaptcha constructor
     */
    public function __construct(array $config = [])
    {
        $this->config = $config;
        $this->enabled = $config['enabled'] ?? false;
        $this->errorMessage = $config['errorMessage'] ?? $this->getDefaultErrorMessage();
        parent::__construct($config);
    }

    /**
     * @inheritdoc
     */
    public function behaviors(): array
    {
        return [
            'parser' => [
                'class' => EnvAttributeParserBehavior::class,
                'attributes' => $this->getEnvAttributes(),
            ],
        ];
    }

    /**
     * Get the provider identifier
     */
    abstract public function getProvider(): string;

    /**
     * Get the provider display name
     */
    abstract public function getName(): string;

    /**
     * Get default error message
     */
    abstract protected function getDefaultErrorMessage(): string;

    /**
     * Get attributes that support environment variables
     */
    abstract public function getEnvAttributes(): array;

    /**
     * Check if captcha is properly configured
     */
    abstract public function isConfigured(): bool;

    abstract public function verifyRequest(Request $request): bool;
    /**
     * Verify captcha token
     */
    abstract public function verify(string $token, ?string $remoteIp = null): bool;

    /**
     * Get frontend script URL
     */
    abstract public function getScriptUrl(): ?string;

    /**
     * Get client-side configuration for frontend
     */
    abstract public function getClientConfig(): array;


    /**
     * Get configuration value with environment variable parsing
     */
    protected function getConfigValue(string $key, $default = null)
    {
        $value = $this->config[$key] ?? $default;
        return is_string($value) ? App::parseEnv($value) : $value;
    }

    /**
     * Check if captcha should be displayed
     */
    public function shouldDisplay(): bool
    {
        return $this->enabled && $this->isConfigured();
    }
}