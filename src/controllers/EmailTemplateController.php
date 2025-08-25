<?php

namespace craftyfm\formbuilder\controllers;

use craft\errors\BusyResourceException;
use craft\errors\StaleResourceException;
use craft\web\Controller;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\models\EmailTemplate;
use yii\base\ErrorException;
use yii\base\Exception;
use yii\base\InvalidConfigException;
use yii\base\NotSupportedException;
use yii\web\NotFoundHttpException;
use yii\web\Response;
use yii\web\ServerErrorHttpException;

class EmailTemplateController extends Controller
{
    public function actionIndex(): Response
    {
        $emailTemplates = FormBuilder::getInstance()->emailTemplates->getAll();

        $array = [];
        foreach ($emailTemplates as $emailTemplate) {
            $array[] = [
                'id' => $emailTemplate->id,
                'title' => $emailTemplate->name,
                'handle' => $emailTemplate->handle,
                'template' => $emailTemplate->template,
                'url' => $emailTemplate->getCpEditUrl(),
            ];
        }
        return $this->renderTemplate('form-builder/settings/email-templates/index', [
            'emailTemplates' => $array,
            'currentPage' => 'email-templates',
        ]);
    }

    /**
     * @throws NotFoundHttpException
     */
    public function actionEdit(string $uid = null, EmailTemplate $emailTemplate = null): Response
    {
        $service = FormBuilder::getInstance()->emailTemplates;

        if (!$emailTemplate) {
            $emailTemplate = $uid ? ($service->getByUid($uid) ?? null) : new EmailTemplate();
            if (!$emailTemplate) {
                throw new NotFoundHttpException('Status not found');
            }
        }

        return $this->renderTemplate('form-builder/settings/email-templates/_edit', [
            'emailTemplate' => $emailTemplate,
            'currentPage' => 'email-templates',
        ]);
    }


    /**
     * @throws NotSupportedException
     * @throws InvalidConfigException
     * @throws ServerErrorHttpException
     * @throws StaleResourceException
     * @throws BusyResourceException
     * @throws ErrorException
     * @throws Exception
     */
    public function actionSave(): ?Response
    {
        $service = FormBuilder::getInstance()->emailTemplates;
        $id = $this->request->getBodyParam('id') ?? null;

        $emailTemplate = new EmailTemplate([
            'id' => $id,
            'name' => $this->request->getBodyParam('name'),
            'handle' => $this->request->getBodyParam('handle'),
            'template' => $this->request->getBodyParam('template'),
        ]);

        if(!$service->saveTemplate($emailTemplate)) {
            return $this->asFailure("Failed to save email template",['errors'=> $emailTemplate->getErrors()],
            [
                'emailTemplate' => $emailTemplate, 'currentPage' => 'email-templates',
            ]);
        }

        return $this->asSuccess("Email template saved.", [
            'emailTemplate' => $emailTemplate,
            'currentPage' => 'email-templates',
        ]);
    }

    /**
     * @throws NotFoundHttpException
     */
    public function actionDelete(string $uid): ?Response
    {
        $service = FormBuilder::getInstance()->emailTemplates;
        $emailTemplate = $service->getByUid($uid);
        if (!$emailTemplate) {
            throw new NotFoundHttpException('Status not found');
        }
        $service->deleteTemplate($emailTemplate);
        return $this->asSuccess("Email template deleted.");

    }
}