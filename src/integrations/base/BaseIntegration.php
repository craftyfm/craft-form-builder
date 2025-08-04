<?php

namespace craftyfm\formbuilder\integrations\base;

use Craft;
use craft\base\SavableComponent;
use craft\helpers\UrlHelper;
use craftyfm\formbuilder\models\IntegrationResult;
use craftyfm\formbuilder\models\Submission;
use craftyfm\formbuilder\records\IntegrationRecord;
use Throwable;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use yii\base\Exception;

abstract class BaseIntegration extends SavableComponent implements IntegrationInterface
{
    public const TYPE_WEBHOOK = 'webhook';
    public const TYPE_MISC = 'miscellaneous';

    public const SCENARIO_SETTINGS = 'settings';
    public const SCENARIO_FORM_SETTINGS = 'formSettings';

    // Core properties
    public ?string $name = null;
    public ?string $handle = null;
    public ?string $type = null;
    public ?string $uid = null;
    public bool $enabled = true;

    protected function defineSettingAttributes(): array
    {
        return ['name', 'handle'];
    }
    protected function defineFormSettingAttributes(): array
    {
        return [];
    }

    public function getSettings(): array
    {
        $settings = [];

        foreach ($this->defineSettingAttributes() as $key) {
            $settings[$key] = $this->{$key} ?? null;
        }

        return $settings;
    }

    public function getFormSettings(): array
    {
        $settings = [];
        foreach ($this->defineFormSettingAttributes() as $key) {
            $settings[$key] = $this->{$key} ?? null;
        }

        return $settings;
    }

    public function setFormSettings(array $settings): void
    {
        foreach ($this->defineFormSettingAttributes() as $key) {
            if (array_key_exists($key, $settings)) {
                $this->{$key} = $settings[$key];
            }
        }
        if ($settings['enabled']) {
            $this->enabled = $settings['enabled'];
        }
    }

    public function getClassName(): string
    {
        return static::class;

    }

    public function scenarios(): array
    {
        $scenarios = parent::scenarios();
        $scenarios[self::SCENARIO_SETTINGS] = $this->defineSettingAttributes();
        $scenarios[self::SCENARIO_FORM_SETTINGS] = $this->defineFormSettingAttributes();
        return $scenarios;

    }

    public function getCpEditUrl(): ?string
    {
        return UrlHelper::cpUrl('form-builder/settings/integrations/' . $this->id);
    }
    /**
     * @inheritdoc
     */
    public function rules(): array
    {
        $rules = parent::rules();

        if ($this->getScenario() === self::SCENARIO_SETTINGS) {
            $rules = array_merge($rules,$this->defineSettingRules());
        } elseif ($this->getScenario() === self::SCENARIO_FORM_SETTINGS) {
            $rules = array_merge($rules,$this->defineFormSettingRules());
        }

        return $rules;
    }

    protected function defineSettingRules(): array
    {
        $rules = [];
        $rules[] = [['name', 'handle'], 'required'];
        $rules[] = [['name', 'handle'], 'string', 'max' => 255];
        $rules[] = [
            'handle',
            'unique',
            'targetClass' => IntegrationRecord::class,
            'targetAttribute' => 'handle',
            'filter' => function($query) {
                if ($this->id !== null) {
                    $query->andWhere(['not', ['id' => $this->id]]);
                }
            },
            'message' => 'Handle must be unique.'
        ];
        return $rules;

    }

    public function getFormSettingsHtml(): string
    {
        return '';
    }

    protected function defineFormSettingRules(): array
    {
        return [];
    }
    /**
     * @inheritdoc
     */
    public function getDisplayName(): string
    {
        return $this->name ?? static::displayName();
    }

    /**
     * @inheritdoc
     */
    public function getType(): string
    {
        return $this->type ?? static::TYPE_MISC;
    }

    /**
     * @inheritdoc
     */
    public function getHandle(): string
    {
        return $this->handle;
    }

    /**
     * Get available integration types
     */
    protected function getAvailableTypes(): array
    {
        return [
            self::TYPE_WEBHOOK,
            self::TYPE_MISC,
        ];
    }

    /**
     * Execute the integration safely with error handling
     */
    public function execute(Submission $submission): IntegrationResult
    {
        if (!$this->enabled) {
            return IntegrationResult::error('Integration is disabled');
        }

        try {
            // Log execution attempt
            Craft::info("Executing integration: {$this->getDisplayName()}", __METHOD__);

            // Call the concrete implementation
            $result = $this->executeIntegration($submission);;


            // Log result
            if ($result->success) {
                Craft::info("Integration executed successfully: {$this->getDisplayName()}", __METHOD__);
            } else {
                Craft::error("Integration failed: {$this->getDisplayName()} - $result->message", __METHOD__);
            }

            return $result;

        } catch (Throwable $e) {

            Craft::error("Integration exception: {$this->getDisplayName()} - {$e->getMessage()}", __METHOD__);

            return IntegrationResult::error($e->getMessage(), $e);
        }
    }

    /**
     * Abstract method that concrete integrations must implement
     */
    abstract protected function executeIntegration(Submission $submission): IntegrationResult;



    protected function generateSubmissionPayload(Submission $submission): array
    {
        $payload = $submission->toArray(
            ['id','ipAddress', 'dateCreated']
        );

        $submissionFields = $submission->getFieldValuesAsJson();

        return array_merge($payload, $submissionFields);
    }

    public function getSettingsHtml(): string
    {
        return "";
    }

    /**
     * @inheritdoc
     */
    public function testConnection(): bool
    {
        try {
            return $this->performConnectionTest();
        } catch (Throwable $e) {
            Craft::error("Connection test failed for {$this->getDisplayName()}: {$e->getMessage()}", __METHOD__);
            return false;
        }
    }

    /**
     * Perform the actual connection test
     * Override in concrete classes
     */
    protected function performConnectionTest(): bool
    {
        return true;
    }
}