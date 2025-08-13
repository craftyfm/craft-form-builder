<?php

namespace craftyfm\formbuilder\integrations\emailmarketing;

use Craft;
use craft\helpers\UrlHelper;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\models\IntegrationResult;
use craftyfm\formbuilder\models\oauth\Oauth2Trait;
use craftyfm\formbuilder\models\ProviderField;
use craftyfm\formbuilder\models\ProviderList;
use craftyfm\formbuilder\models\Submission;
use GuzzleHttp\Exception\GuzzleException;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use verbb\formie\models\IntegrationField;
use yii\base\Exception;

class ConstantContact extends BaseEmailMarketing
{
    use Oauth2Trait;
    public ?string $clientId = null;
    public ?string $clientSecret = null;

    public static array $predefineSchemaProperties = ['email_address', 'first_name', 'last_name',
        'job_title', 'company_name', 'phone_number', 'anniversary', 'birthday_month', 'birthday_day', 'birthday_year',
        'street_address'
    ];
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
        return 'https://api.cc.email/' . self::$version . '/';
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

    /**
     * @throws \yii\db\Exception
     */
    protected function executeIntegration(Submission $submission): IntegrationResult
    {
        $result = new IntegrationResult();

        if ($this->optIn) {
            $optInValue = $submission->getSubmissionFieldValueById($this->optIn);
            if (!$optInValue) {
                $result->success = false;
                $result->message = Craft::t('form-builder', 'Opt-in field used but not chosen. Skipping.');
                return $result;
            }
        }

        if (!$this->listId) {
            $result->success = false;
            $result->message = Craft::t('form-builder', 'No list selected.');
            return $result;
        }

        try {
            $mappingValues = $this->getFieldMappingValues($submission);
            if (empty($mappingValues)) {
                throw new Exception('No mapping values provided.');
            }

            $email = $mappingValues['email_address'] ?? null;
            if (!$email) {
                throw new Exception('Email is required');
            }

            $payload = [];
            $payload['email_address'] = $email;
            $payload['list_memberships'] = [$this->listId];

            foreach ($mappingValues as $key => $value) {
                if (in_array($key, self::$predefineSchemaProperties)) {
                    $payload[$key] = $value;
                } else {
                    $payload['custom_fields'][] = [
                        'custom_field_id' => $key,
                        'value' => $value,
                    ];
                }
            }

            $response = $this->sendOAuth2Request('contacts/sign_up_form', 'POST', $payload);

            if ($response->getStatusCode() >= 200 && $response->getStatusCode() < 300) {
                $result->success = true;
                $result->data = json_decode((string) $response->getBody(), true);
                return $result;
            }
            $result->success = false;
            $result->data = json_decode((string) $response->getBody(), true);
            return $result;
        } catch (\Exception $e) {
            $result->success = false;
            $result->message = $e->getMessage();
            return $result;
        } catch (GuzzleException $e) {
            $result->success = false;
            $result->message = $e->getMessage();
            return $result;
        }


    }

    public function getProviderHandle(): string
    {
        return  'constantContact';
    }

    /**
     * @throws Exception
     */
    public function fetchFields(): array
    {
        try {
            $response = $this->sendOAuth2Request('contact_custom_fields', 'GET');
            $body = json_decode($response->getBody()->getContents(), true);
            $fields = [
                new ProviderField(['handle' => 'email_address', 'label' => Craft::t('form-builder', 'Email'), 'required' => true]),
                new ProviderField(['handle' => 'first_name', 'label' => Craft::t('form-builder', 'First Name')]),
                new ProviderField(['handle' => 'last_name', 'label' => Craft::t('form-builder', 'Last Name')]),
                new ProviderField(['handle' => 'job_title', 'label' => Craft::t('form-builder', 'Job Title')]),
                new ProviderField(['handle' => 'company_name', 'label' => Craft::t('form-builder', 'Company Name')]),
                new ProviderField(['handle' => 'phone_number', 'label' => Craft::t('form-builder', 'Phone Number')]),
                new ProviderField(['handle' => 'anniversary', 'label' => Craft::t('form-builder', 'Anniversary')]),
            ];

            if (!isset($body['custom_fields'])) {
                return $fields;
            }

            foreach ($body['custom_fields'] as $field) {
                $fields[] = new ProviderField(['handle' => $field['custom_field_id'], 'label' => $field['label'], 'type' => $field['type']]);
            }

            return $fields;
        } catch (\Exception|GuzzleException $e) {
            FormBuilder::log($e->getMessage(), 'debug');
            throw new Exception($e->getMessage(), $e->getCode(), $e);
        }
    }


    /**
     * @throws Exception
     * @return ProviderList[]
     */
    public function fetchLists(): array
    {
        try {
            $response = $this->sendOAuth2Request(
                'contact_lists',
                'GET',
                ['status' => 'active']
            );
            $body = json_decode($response->getBody()->getContents(), true);
            $jsonLists = $body['lists'] ?? [];
            $fields = $this->fetchFields();
            $lists = [];
            foreach ($jsonLists as $list) {
                $lists[] = new ProviderList([
                    'id' => $list['list_id'],
                    'name' => $list['name'],
                    'fields' => $fields,
                ]);
            }

            return $lists;
        } catch (\Exception|GuzzleException $e) {
            FormBuilder::log($e->getMessage(), 'debug');
            throw new Exception($e->getMessage(), $e->getCode(), $e);
        }
    }
}