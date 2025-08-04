<?php

namespace craftyfm\formbuilder\controllers;

use craft\errors\MissingComponentException;
use craft\helpers\UrlHelper;
use craft\web\Controller;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\integrations\base\BaseIntegration;
use craftyfm\formbuilder\integrations\base\IntegrationInterface;
use yii\base\InvalidConfigException;
use yii\web\BadRequestHttpException;
use yii\web\MethodNotAllowedHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

/**
 * Integration Controller
 *
 * Handles CP routes for managing integrations
 */
class IntegrationSettingsController extends Controller
{

    /**
     * Index page - list all integrations
     */
    public function actionIndex(): Response
    {
        $integrations = FormBuilder::getInstance()->integrations->getAllIntegrations();
        $tableData = [];
        foreach ($integrations as $integration) {
            $tableData[] = [
                'id' => $integration->id,
                'title' => $integration->name,
                'type' => $integration->getType(),
                'url' => $integration->getCpEditUrl(),
                'enabled' => $integration->enabled,
            ];
        }
        return $this->renderTemplate('form-builder/settings/integrations/index', [
            'tableData' => $tableData, 'currentPage' => 'integrations'
        ]);
    }

    /**
     * Edit existing integration
     * @throws NotFoundHttpException
     */
    public function actionEdit(int $id = null, IntegrationInterface $integration = null): Response
    {
        $integrationService = FormBuilder::getInstance()->integrations;

        if (!$integration) {
            if ($id) {
                $integration = $integrationService->getIntegrationById($id);
                if (!$integration) {
                    throw new NotFoundHttpException('Integration not found');
                }
            } else {
                $integration = null;
            }
        }

        $integrationTypes = $integrationService->getAllIntegrationTypes();

        $providerInstances = [];
        $providerOptions = [];
        foreach ($integrationTypes as $integrationProviders) {
            foreach ($integrationProviders as $provider) {

                try {
                    if (!$integration) {
                        $integration = $integrationService->constructIntegration([
                            'type' => $provider,
                        ]);
                    }
                    $providerInstances[$provider] = $integrationService->constructIntegration([
                        'type' => $provider,
                    ]);
                    $providerOptions[] = [
                        'label' => $providerInstances[$provider]->displayName(),
                        'value' => $provider,
                    ];
                } catch (InvalidConfigException|MissingComponentException $e) {
                    FormBuilder::log($e->getMessage(), 'error');
                }
            }
        }


        return $this->renderTemplate('form-builder/settings/integrations/edit',
            compact('integration', 'providerOptions', 'providerInstances')
        );
    }

    /**
     * Save integration
     * @return Response|null
     * @throws InvalidConfigException
     * @throws MethodNotAllowedHttpException
     * @throws MissingComponentException
     * @throws NotFoundHttpException
     * @throws \Exception
     */
    public function actionSave(): ?Response
    {
        $this->requirePostRequest();
        $id = $this->request->getBodyParam('id');
        $provider = $this->request->getBodyParam('provider');
        $settings = $this->request->getParam('settings.' . $provider, []);

        $integrationsService = FormBuilder::getInstance()->integrations;
        $loadedIntegration = null;
        if ($id) {
            $loadedIntegration = $integrationsService->getIntegrationById($id);
            if (!$loadedIntegration) {
                throw new NotFoundHttpException('Integration not found');
            }
        }


        $config = [
            'id' => $id,
            'name' => $this->request->getParam('name'),
            'handle' => $this->request->getParam('handle'),
            'type' => $provider,
            'enabled' => (bool)$this->request->getParam('enabled'),
            'settings' => $settings,
            'uid' => $loadedIntegration?->uid ?? null,
        ];

        $integration = $integrationsService->constructIntegration($config);
        $integration->setScenario(BaseIntegration::SCENARIO_SETTINGS);
        // Save integration
        if (!$integrationsService->saveIntegration($integration)) {
            return $this->asFailure("Failed to save integration", [
                'errors' => $integration->getErrors(),
            ], ['integration' => $integration]);
        }

        return $this->asSuccess("Integration saved.", [
            'integration' => $integration, UrlHelper::cpUrl('form-builder/settings/integrations')
        ]);
    }

    /**
     * Delete integration
     * @return Response
     * @throws InvalidConfigException
     * @throws MethodNotAllowedHttpException
     * @throws MissingComponentException
     * @throws NotFoundHttpException
     * @throws BadRequestHttpException
     */
    public function actionDelete(): Response
    {
        $this->requirePostRequest();

        $integrationId = $this->request->getRequiredBodyParam('id');
        $integrationsService = FormBuilder::getInstance()->integrations;
        $integration = $integrationsService->getIntegrationById($integrationId);
        if (!$integration) {
            throw new NotFoundHttpException('Integration not found');
        }

        if (!$integrationsService->deleteIntegration($integration)) {
            return $this->asFailure("Failed to delete integration", []);
        }
        return $this->asSuccess("Integration deleted.", []);

    }

}


