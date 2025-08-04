<?php

namespace craftyfm\formbuilder\controllers;

use Craft;
use craft\errors\MissingComponentException;
use craft\web\Controller;
use craftyfm\formbuilder\FormBuilder;
use yii\web\BadRequestHttpException;
use yii\web\MethodNotAllowedHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

/**
 * Settings controller
 */
class SettingsController extends Controller
{
    /**
     * @inheritdoc
     */
    protected array|bool|int $allowAnonymous = false;


    /**
     * Save general settings (from main settings page)
     * @throws MethodNotAllowedHttpException
     * @throws MissingComponentException
     * @throws BadRequestHttpException
     */
    public function actionSave(): Response
    {
        $this->requirePostRequest();
        if (!Craft::$app->config->general->allowAdminChanges) {
            throw new MethodNotAllowedHttpException('Admin changes are disabled.');
        }

        $settings = FormBuilder::getInstance()->getSettings();
        $request = Craft::$app->getRequest();

        // Only handle basic settings here (no captcha)
        $settingsData = $request->getBodyParam('settings', []);
        $settings->setAttributes($settingsData, false);

        if (!$settings->validate()) {
            Craft::$app->getSession()->setError("Couldn't save settings.");

            return $this->renderTemplate('form-builder/settings/index', [
                'settings' => $settings,
                'volumes' => Craft::$app->getVolumes()->getAllVolumes(),
            ]);
        }

        $pluginSettingsService = Craft::$app->getPlugins();
        $saveResult = $pluginSettingsService->savePluginSettings(FormBuilder::getInstance(), $settings->toArray());


        if (!$saveResult) {
            Craft::$app->getSession()->setError("Couldn't save settings.");

            return $this->renderTemplate('form-builder/settings/index', [
                'settings' => $settings,
                'volumes' => Craft::$app->getVolumes()->getAllVolumes(),
            ]);
        }

        Craft::$app->getSession()->setNotice('Settings saved.');
        return $this->redirectToPostedUrl();
    }

    /**
     * Save captcha settings (from captcha settings page)
     * @throws MissingComponentException
     * @throws BadRequestHttpException
     * @throws MethodNotAllowedHttpException
     * @throws NotFoundHttpException
     */
    public function actionSaveCaptcha(): Response
    {
        $this->requirePostRequest();
        if (!Craft::$app->config->general->allowAdminChanges) {
            throw new MethodNotAllowedHttpException('Admin changes are disabled.');
        }
        $request = Craft::$app->getRequest();
        $handle = $request->getBodyParam('handle');

        if (!$handle) {
            throw new BadRequestHttpException('Captcha handle is required');
        }

        $captchaManager = FormBuilder::getInstance()->captchaManager;
        $captcha = $captchaManager->getCaptcha($handle);
        
        if (!$captcha) {
            throw new NotFoundHttpException('Invalid captcha provider');
        }

        $settings = FormBuilder::getInstance()->getSettings();

        // Get all form parameters for this specific captcha
        $config = [];
        
        // Get the enabled status
        $config['enabled'] = (bool)$request->getBodyParam('enabled', false);
        
        // Get other configuration values based on the captcha's expected attributes
        $envAttributes = $captcha->getEnvAttributes();
        foreach ($envAttributes as $attribute) {
            $value = $request->getBodyParam($attribute);
            if ($value !== null) {
                $config[$attribute] = $value;
            }
        }

        // Also get common fields like errorMessage
        if ($request->getBodyParam('errorMessage') !== null) {
            $config['errorMessage'] = $request->getBodyParam('errorMessage');
        }

        if ($handle === 'recaptcha') {
            if ($request->getBodyParam('scoreThreshold') !== null) {
                $config['scoreThreshold'] = (float)$request->getBodyParam('scoreThreshold');
            }
        }

        // Save the current captcha configuration
        $settings->setCaptchaConfig($handle, $config);

        // Create a new captcha instance with the new config for validation
        $captchaClass = get_class($captcha);
        $validateCaptcha = new $captchaClass($config);

        // Validate the captcha configuration
        if (!$validateCaptcha->validate()) {
            Craft::$app->getSession()->setError("Invalid {$validateCaptcha->getName()} configuration: " . implode(', ', $validateCaptcha->getFirstErrors()));
        
            return $this->renderTemplate("form-builder/settings/captcha/{$handle}", [
                'captcha' => $validateCaptcha,
                'errors' => $validateCaptcha->getErrors()
            ]);
        }

        // Validate and save plugin settings
        if (!$settings->validate()) {
            Craft::$app->getSession()->setError("Couldn't save captcha settings: " . implode(', ', $settings->getFirstErrors()));
        
            return $this->renderTemplate("form-builder/settings/captcha/{$handle}", [
                'captcha' => $validateCaptcha,
                'errors' => $settings->getErrors()
            ]);
        }

        $pluginSettingsService = Craft::$app->getPlugins();
        $saveResult = $pluginSettingsService->savePluginSettings(FormBuilder::getInstance(), $settings->toArray());

        if (!$saveResult) {
            Craft::$app->getSession()->setError("Couldn't save captcha settings.");
        
            return $this->renderTemplate("form-builder/settings/captcha/{$handle}", [
                'captcha' => $validateCaptcha
            ]);
        }

        Craft::$app->getSession()->setNotice("{$validateCaptcha->getName()} settings saved successfully.");
        return $this->redirectToPostedUrl();
    }
}