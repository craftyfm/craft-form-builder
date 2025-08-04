<?php

namespace craftyfm\formbuilder\integrations\captcha;

use Craft;
use craft\web\Request;

/**
 * Google reCAPTCHA Integration
 */
class ReCaptcha extends BaseCaptcha
{
    public string $siteKey = '';
    public string $secretKey = '';
    public float $scoreThreshold = 0.5;

    /**
     * @inheritdoc
     */
    public function getProvider(): string
    {
        return 'recaptcha';
    }

    /**
     * @inheritdoc
     */
    public function getName(): string
    {
        return 'Google reCAPTCHA';
    }

    /**
     * @inheritdoc
     */
    protected function getDefaultErrorMessage(): string
    {
        return 'Please complete the reCAPTCHA verification.';
    }

    /**
     * @inheritdoc
     */
    public function getEnvAttributes(): array
    {
        return ['siteKey', 'secretKey'];
    }

    /**
     * @inheritdoc
     */
    public function rules(): array
    {
        $rules = parent::rules();

        if ($this->enabled) {
            $rules[] = [['siteKey', 'secretKey'], 'string'];
            $rules[] = [['errorMessage'], 'string'];
            $rules[] = [['scoreThreshold'], 'number', 'min' => 0, 'max' => 1];;
            $rules[] = [['siteKey', 'secretKey', 'scoreThreshold'], 'required'];
        }



        return $rules;
    }

    /**
     * @inheritdoc
     */
    public function getValidationRules(): array
    {
        return [
            [['siteKey', 'secretKey'], 'required'],
            [['siteKey', 'secretKey'], 'string'],
            [['version'], 'in', 'range' => ['v2', 'v3']],
            [['scoreThreshold'], 'number', 'min' => 0, 'max' => 1],
            [['errorMessage'], 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function isConfigured(): bool
    {
        return !empty($this->getConfigValue('siteKey')) &&
            !empty($this->getConfigValue('secretKey'));
    }

    /**
     * @inheritdoc
     */
    public function verify(string $token, ?string $remoteIp = null): bool
    {
        if (!$this->isConfigured()) {
            return false;
        }

        $secretKey = $this->getConfigValue('secretKey');

        $postData = [
            'secret' => $secretKey,
            'response' => $token,
        ];

        if ($remoteIp) {
            $postData['remoteip'] = $remoteIp;
        }

        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify", false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'content' => http_build_query($postData)
            ]
        ]));

        $result = json_decode($response, true);
        if (!($result['success'] ?? false)) {
            return false;
        }

        $score = $result['score'] ?? 0;
        $threshold = $this->getConfigValue('scoreThreshold', 0.5);
        return $score >= $threshold;

    }

    /**
     * @inheritdoc
     */
    public function getScriptUrl(): ?string
    {
        if (!$this->isConfigured()) {
            return null;
        }

        return 'https://www.google.com/recaptcha/api.js';
    }

    /**
     * @inheritdoc
     */
    public function getClientConfig(): array
    {
        if (!$this->isConfigured()) {
            return [];
        }

        $version = $this->getConfigValue('version', 'v2');

        $config = [
            'provider' => $this->getProvider(),
            'siteKey' => $this->getConfigValue('siteKey'),
        ];

        if ($version === 'v3') {
            $config['action'] = 'form_submit';
        }

        return $config;
    }

    /**
     * Get available versions
     */
    public function getVersions(): array
    {
        return [
            'v3' => 'Version 3 (Score-based)',
        ];
    }

    public function verifyRequest(Request $request): bool
    {
        $token = $request->getBodyParam('g-recaptcha-response');
        return $this->verify($token, $request->getUserIP());

    }
}