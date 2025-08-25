<?php

namespace craftyfm\formbuilder;

use Craft;
use craft\base\Model;
use craft\base\Plugin;
use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterUserPermissionsEvent;
use craft\services\Fields;
use craft\services\UserPermissions;
use craft\web\twig\variables\CraftVariable;
use craft\web\UrlManager;
use craftyfm\formbuilder\fields\FormSelectField;
use craftyfm\formbuilder\models\Settings;
use craftyfm\formbuilder\services\CaptchaManager;
use craftyfm\formbuilder\services\EmailNotification;
use craftyfm\formbuilder\services\EmailTemplates;
use craftyfm\formbuilder\services\FormIntegrations;
use craftyfm\formbuilder\services\Forms;
use craftyfm\formbuilder\services\Icons;
use craftyfm\formbuilder\services\Integrations;
use craftyfm\formbuilder\services\OauthToken;
use craftyfm\formbuilder\services\Submissions;
use craftyfm\formbuilder\services\SubmissionStatuses;
use craftyfm\formbuilder\services\Upload;
use Psr\Log\LogLevel;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use yii\base\Event;
use yii\base\Exception;
use yii\base\InvalidConfigException;
use yii\base\InvalidRouteException;

/**
 * form-builder plugin
 *
 * @method static FormBuilder getInstance()
 * @method Settings getSettings()
 * @property Forms $forms
 * @property Submissions $submissions
 * @property Icons $icons
 * @property CaptchaManager $captchaManager
 * @property Upload $upload
 * @property SubmissionStatuses $submissionStatuses
 * @property EmailNotification $emailNotification
 * @property Integrations $integrations
 * @property OauthToken $oauthToken
 * @property FormIntegrations $formIntegrations
 * @property EmailTemplates $emailTemplates
 * @author craftyfm
 * @copyright craftyfm
 * @license https://craftcms.github.io/license/ Craft License
 */
class FormBuilder extends Plugin
{
    public string $schemaVersion = '1.0.2';
    public bool $hasCpSettings = true;
    public bool $hasCpSection = true;


    public static function config(): array
    {
        return [
            'components' => [
                'forms' => Forms::class,
                'submissions' => Submissions::class,
                'icons' => Icons::class,
                'captchaManager' => CaptchaManager::class,
                'upload' => Upload::class,
                'submissionStatuses' => SubmissionStatuses::class,
                'emailNotification' => EmailNotification::class,
                'integrations' => Integrations::class,
                'oauthToken' => OauthToken::class,
                'formIntegrations' => FormIntegrations::class,
                'emailTemplates' => EmailTemplates::class,
            ],
        ];
    }

    public function init(): void
    {
        parent::init();

        $this->attachEventHandlers();
        $this->_registerProjectConfig();

        // Any code that creates an element query or loads Twig should be deferred until
        // after Craft is fully initialized, to avoid conflicts with other plugins/modules
        Craft::$app->onInit(function() {
            // ...
        });
    }

    /**
     * @inheritdoc
     * @throws InvalidRouteException
     */
    public function getSettingsResponse(): mixed
    {
        // Redirect to our custom settings page instead of the default one
        return Craft::$app->getResponse()->redirect(
            Craft::$app->getUrlManager()->createUrl('form-builder/settings')
        );
    }


    /**
     * @throws InvalidConfigException
     */
    protected function createSettingsModel(): ?Model
    {
        return Craft::createObject(Settings::class);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws Exception
     * @throws LoaderError
     */
    protected function settingsHtml(): ?string
    {
        return Craft::$app->view->renderTemplate('form-builder/_settings.twig', [
            'plugin' => $this,
            'settings' => $this->getSettings(),
        ]);
    }

    public function getCpNavItem(): array
    {
        $nav = parent::getCpNavItem();
        $nav['label'] = 'Form Builder'; // Label in the nav
        $nav['url'] = 'form-builder'; // Where it links to
        $nav['subnav'] = [
            'forms' => ['label' => 'Forms', 'url' => 'form-builder/forms'],
            'submissions' => ['label' => 'Submissions', 'url' => 'form-builder/submissions'],
        ];
        if (Craft::$app->getUser()->getIsAdmin()) {
            $nav['subnav']['form-builder-settings'] = ['label' => 'Settings', 'url' => 'form-builder/settings/general'];
        }
        return $nav;
    }


    private function attachEventHandlers(): void
    {
        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            function(Event $e) {
                /** @var CraftVariable $variable */
                $variable = $e->sender;

                // Attach a service:
                $variable->set('formBuilder', variables\FormBuilder::class);
            }
        );

        $this->_registerCpRoutes();
        $this->_registerPermissions();
        $this->_registerFieldTypes();

    }


    /**
     * Log plugin messages
     */
    public static function log(string $message, string $level = LogLevel::INFO): void
    {
        $logMap = [
            LogLevel::INFO => LogLevel::INFO,
            LogLevel::ERROR => LogLevel::ERROR,
            LogLevel::WARNING => LogLevel::WARNING,
            LogLevel::NOTICE => LogLevel::NOTICE,
            LogLevel::DEBUG => LogLevel::DEBUG,
        ];
        Craft::getLogger()->log($message, $logMap[$level], 'form-builder');
    }


    private function _registerCpRoutes(): void
    {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['form-builder'] = 'form-builder/forms/index';
                $event->rules['form-builder/forms'] = 'form-builder/forms/index';
                $event->rules['form-builder/forms/<id:\d+>'] = 'form-builder/forms/edit';

                $event->rules['form-builder/submissions'] = 'form-builder/submissions/index';
                $event->rules['form-builder/submissions/<handle:[a-zA-Z0-9_-]+>'] = 'form-builder/submissions/index';
                $event->rules['form-builder/submissions/<handle:[a-zA-Z0-9_-]+>/<id:\d+>'] = 'form-builder/submissions/view';

                if (Craft::$app->getUser()->getIsAdmin()) {
                    $event->rules['form-builder/settings/statuses'] = 'form-builder/submission-status/index';
                    $event->rules['form-builder/settings/statuses/new'] = 'form-builder/submission-status/edit';
                    $event->rules['form-builder/settings/statuses/<uid:{uid}>'] = 'form-builder/submission-status/edit';

                    $event->rules['form-builder/settings/integrations'] = 'form-builder/integration-settings/index';
                    $event->rules['form-builder/settings/integrations/new'] = 'form-builder/integration-settings/edit';
                    $event->rules['form-builder/settings/integrations/<id:\d+>'] = 'form-builder/integration-settings/edit';

                    $event->rules['form-builder/settings/email-templates'] = 'form-builder/email-template/index';
                    $event->rules['form-builder/settings/email-templates/new'] = 'form-builder/email-template/edit';
                    $event->rules['form-builder/settings/email-templates/<uid:{uid}>'] = 'form-builder/email-template/edit';
                }

                $event->rules['form-builder/integration/oauth-callback'] = 'form-builder/integration/oauth-callback';;

            }
        );
    }

    private function _registerPermissions(): void
    {
        Event::on(
            UserPermissions::class,
            UserPermissions::EVENT_REGISTER_PERMISSIONS,
            function(RegisterUserPermissionsEvent $event) {
                $event->permissions[] = [
                    'heading' => Craft::t('form-builder', 'Form Builder'),

                    'permissions' => [
                        'form-builder-manageForms' => [
                            'label' => Craft::t('form-builder', 'Manage Forms'),
                        ],
                        'form-builder-viewSubmissions' => [
                            'label' => Craft::t('form-builder', 'View Submissions'),
                        ],
                        'form-builder-deleteSubmissions' => [
                            'label' => Craft::t('form-builder', 'Delete Submissions'),
                        ],
                        'form-builder-updateSubmissions' => [
                            'label' => Craft::t('form-builder', 'Update Submissions')
                        ],
//                        'form-builder-exportSubmissions' => Craft::t('form-builder', 'Export Submissions'),
                    ],
                ];
            }
        );
    }

    private function _registerFieldTypes(): void
    {
        Event::on(
            Fields::class,
            Fields::EVENT_REGISTER_FIELD_TYPES,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = FormSelectField::class;
            }
        );
    }

    private function _registerProjectConfig(): void
    {
        Craft::$app->getProjectConfig()
            ->onAdd(Integrations::CONFIG_KEY.'.{uid}', [$this->integrations, 'handleChangedIntegration'])
            ->onUpdate(Integrations::CONFIG_KEY.'.{uid}', [$this->integrations, 'handleChangedIntegration'])
            ->onRemove(Integrations::CONFIG_KEY.'.{uid}', [$this->integrations, 'handleDeletedIntegration']);

        Craft::$app->getProjectConfig()
            ->onAdd(EmailTemplates::CONFIG_KEY.'.{uid}', [$this->emailTemplates, 'handleChangedTemplate'])
            ->onUpdate(EmailTemplates::CONFIG_KEY.'.{uid}', [$this->emailTemplates, 'handleChangedTemplate'])
            ->onRemove(EmailTemplates::CONFIG_KEY.'.{uid}', [$this->emailTemplates, 'handleDeletedTemplate']);

        Craft::$app->getProjectConfig()
            ->onAdd(SubmissionStatuses::CONFIG_KEY.'.{uid}', [$this->submissionStatuses, 'handleChangedStatus'])
            ->onUpdate(SubmissionStatuses::CONFIG_KEY.'.{uid}', [$this->submissionStatuses, 'handleChangedStatus'])
            ->onRemove(SubmissionStatuses::CONFIG_KEY.'.{uid}', [$this->submissionStatuses, 'handleDeletedStatus']);
    }


}
