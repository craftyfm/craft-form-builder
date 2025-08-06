<?php

namespace craftyfm\formbuilder\integrations\captcha;

use craft\web\Request;

/**
 * hCaptcha Integration
 */
class HCaptcha extends BaseCaptcha
{

    public string $siteKey = '';
    public string $secretKey = '';
    /**
     * @inheritdoc
     */
    public function getProvider(): string
    {
        return 'hcaptcha';
    }

    /**
     * @inheritdoc
     */
    public function getName(): string
    {
        return 'hCaptcha';
    }

    /**
     * @inheritdoc
     */
    protected function getDefaultErrorMessage(): string
    {
        return 'Please complete the hCaptcha verification.';
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

        $response = file_get_contents("https://hcaptcha.com/siteverify", false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'content' => http_build_query($postData)
            ]
        ]));

        $result = json_decode($response, true);
        return $result['success'] ?? false;
    }

    /**
     * @inheritdoc
     */
    public function getScriptUrl(): ?string
    {
        if (!$this->isConfigured()) {
            return null;
        }

        return 'https://hcaptcha.com/1/api.js';
    }

    /**
     * @inheritdoc
     */
    public function getClientConfig(): array
    {
        if (!$this->isConfigured()) {
            return [];
        }

        return [
            'provider' => $this->getProvider(),
            'siteKey' => $this->getConfigValue('siteKey'),
        ];
    }

    public function verifyRequest(Request $request): bool
    {
        $token = $request->getBodyParam('h-captcha-response');
        return $this->verify($token, $request->getUserIP());

    }
}