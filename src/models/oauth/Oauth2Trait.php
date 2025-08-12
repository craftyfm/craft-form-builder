<?php

namespace craftyfm\formbuilder\models\oauth;

use Craft;
use craft\helpers\App;
use craft\helpers\DateTimeHelper;
use craft\helpers\Db;
use craft\helpers\UrlHelper;
use craftyfm\formbuilder\FormBuilder;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\RequestException;
use Random\RandomException;
use yii\base\Exception;

trait Oauth2Trait
{
    public ?string $clientId = null;

    public ?string $clientSecret = null;
    private ?Token $_token;

    abstract public function getBaseApiUrl(): string;
    abstract public function getBaseAuthUrl(): string;
    abstract public function getBaseTokenUrl(): string;

    abstract public function getProviderHandle(): string;
    public function getRedirectUri(): string
    {
        return UrlHelper::cpUrl('form-builder/integration/oauth-callback');
    }

    public function getClientId(): string
    {
        return App::parseEnv($this->clientId);

    }
    public function getClientSecret(): string
    {
        return App::parseEnv($this->clientSecret);
    }

    public function getScopes(): string|array
    {
        return '';
    }

    public function getState(): ?string
    {
        return '';
    }
    public function getAuthorizationUrlOptions(): array
    {
        return [
            'client_id'     => $this->getClientId(),
            'redirect_uri'  => $this->getRedirectUri(),
            'response_type' => 'code',
            'scope'         => $this->getScopes(),
            'state'         => $this->getState(),
        ];

    }
    /**
     * @throws RandomException
     */
    public function getAuthUrl(array $params = []): string
    {
        $query = array_merge($this->getAuthorizationUrlOptions(), $params);

        return $this->getBaseAuthUrl() . '?' . http_build_query($query);
    }

    /**
     * Get authorization data (code, state) from Craft request
     */
    public function getAuthorizeData(): array
    {
        $request = Craft::$app->getRequest();
        return [
            'code'  => $request->getParam('code'),
            'state' => $request->getParam('state'),
            'error' => $request->getParam('error'),
        ];
    }

    /**
     * @throws GuzzleException
     * @throws Exception
     */
    public function fetchAccessToken(string $code): bool
    {
        $client = $this->getHttpClient();

        try {
            $response = $client->post($this->getBaseTokenUrl(), [
                'form_params' => [
                    'grant_type'    => 'authorization_code',
                    'code'          => $code,
                    'redirect_uri'  => $this->getRedirectUri(),
                    'client_id'     => $this->getClientId(),
                    'client_secret' => $this->getClientSecret(),
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            if (isset($data['error'])) {
                throw new Exception($data['error']);
            }
            return $this->storeToken($data);
        } catch (RequestException|Exception $e) {
            FormBuilder::log($e->getMessage(), 'error');
            throw $e;
        } catch (GuzzleException $e) {
            FormBuilder::log($e->getMessage(), 'error');
            throw $e;
        }
    }


    public function refreshAccessToken(): ?array
    {
        if (empty($this->tokenData['refresh_token'])) {
            Craft::warning('No refresh token available.', __METHOD__);
            return null;
        }

        $client = $this->getHttpClient();

        try {
            $response = $client->post($this->oauthConfig['token_url'], [
                'form_params' => [
                    'grant_type'    => 'refresh_token',
                    'refresh_token' => $this->tokenData['refresh_token'],
                    'client_id'     => $this->clientId,
                    'client_secret' => $this->clientSecret,
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            return $this->storeTokenData($data);
        } catch (RequestException $e) {
            Craft::error('OAuth2 refresh failed: ' . $e->getMessage(), __METHOD__);
            return null;
        }
    }


    /**
     * @throws Exception
     */
    public function storeToken(array $data): bool
    {
        if ($this->id == null) {
            throw new Exception("Integration need to be saved before authorized!");
        }
        $expiresIn = isset($data['expires_in']) ? (int)$data['expires_in'] : 3600;

        $token = new Token([
            'accessToken'   => $data['access_token'] ?? '',
            'refreshToken'  => $data['refresh_token'] ?? null,
            'tokenType'     => $data['token_type'] ?? 'Bearer',
            'dateExpired'   => date('Y-m-d H:i:s', time() + $expiresIn - 60), // if DB is DATETIME
            'reference'     => $this->uid,
            'provider'      => $this->getProviderHandle(), // short handle instead of full class name
            'integrationId' => $this->id,
            'scopes'        => $data['scope'] ?? '',
        ]);


        return FormBuilder::getInstance()->oauthToken->saveOauthToken($token);
    }

    /**
     * Create a reusable Guzzle client
     */
    protected function getHttpClient(): Client
    {
        return new Client([
            'timeout' => 10,
            'http_errors' => false,
        ]);
    }

}