<?php

namespace craftyfm\formbuilder\models\oauth;

use craft\base\Model;
use DateTime;

class Token extends Model
{
    public ?int $id = null;
    public string $provider = '';
    public ?string $reference = null;
    public string $accessToken = '';
    public string $tokenType = '';
    public ?string $refreshToken = null;
    public ?DateTime $dateExpired = null;
    public ?string $scopes = null;
    public ?int $integrationId = null;
    public ?DateTime $dateCreated = null;
    public ?DateTime $dateUpdated = null;

    /**
     * Check if token is expired or close to expiring.
     */
    public function isExpired(): bool
    {
        if (!$this->dateExpired) {
            return false; // Some APIs issue non-expiring tokens
        }

        $now = new DateTime();
        // Add small buffer (60 seconds) to avoid edge-case failures
        return $this->dateExpired <= $now->modify('+60 seconds');
    }

    /**
     * Return scopes as array.
     */
    public function getScopesArray(): array
    {
        if (!$this->scopes) {
            return [];
        }

        // Support space-separated or JSON storage
        $json = json_decode($this->scopes, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($json)) {
            return $json;
        }

        return preg_split('/\s+/', trim($this->scopes)) ?: [];
    }

    /**
     * Set scopes from array.
     */
    public function setScopesArray(array $scopes): void
    {
        $this->scopes = implode(' ', $scopes);
    }

    public function rules(): array
    {
        $rules = parent::rules();
        $rules[] = ['integrationId', 'required'];
        return $rules;
    }
}