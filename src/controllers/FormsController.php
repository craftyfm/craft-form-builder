<?php

namespace craftyfm\formbuilder\controllers;

use Craft;
use craft\helpers\StringHelper;
use craft\web\Controller;
use craft\web\View;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\models\Form;
use craftyfm\formbuilder\models\Submission;
use craftyfm\formbuilder\web\assets\formbuilder\FormBuilderAsset;
use Error;
use yii\base\Exception;
use yii\base\InvalidConfigException;
use yii\web\BadRequestHttpException;
use yii\web\MethodNotAllowedHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class FormsController extends Controller
{

    public function beforeAction($action): bool
    {
        $this->requirePermission('form-builder-manageForms');
        return parent::beforeAction($action);
    }

    /**
     * @throws InvalidConfigException
     */
    public function actionIndex(): Response
    {

        return $this->renderTemplate('form-builder/forms/index');
    }



    /**
     * @throws InvalidConfigException
     */
    public function actionNew(): Response
    {
        $this->view->registerAssetBundle(FormBuilderAsset::class);
        $iconSets = FormBuilder::getInstance()->icons->listAvailableIconSets();
        $form = new Form();
        return $this->renderTemplate('form-builder/forms/edit', compact('iconSets', 'form'));
    }


    /**
     * @throws InvalidConfigException
     * @throws \Exception
     */
    public function actionEdit(int $id): Response
    {
        $form = FormBuilder::getInstance()->forms->getFormById($id);
        if (!$form) {
            throw new NotFoundHttpException('Form not found');
        }
        $js = 'window.FormBuilderData = ' . json_encode($form->asArray(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . ';';

        Craft::$app->getView()->registerJs($js, \yii\web\View::POS_HEAD);
        $this->view->registerAssetBundle(FormBuilderAsset::class);
        $iconSets = FormBuilder::getInstance()->icons->listAvailableIconSets();
        return $this->renderTemplate('form-builder/forms/edit', compact('iconSets', 'form'));
    }


    /**
     * @throws MethodNotAllowedHttpException
     * @throws Exception
     * @throws \Exception
     * @throws \Throwable
     */
    public function actionSave(): ?Response
    {

        $this->requirePostRequest();
        $this->requireAcceptsJson();
        $request = Craft::$app->getRequest();

        $rawData = $request->getBodyParam('form');
        $user = Craft::$app->getUser()->getIdentity();

        if (!$user) {
            return $this->asFailure("You are not logged in",[
                'success' => false,
                'error' => 'You are not logged in.'
            ]);
        }


        if (!$rawData) {
            return $this->asFailure("Invalid form data",[
                'success' => false,
                'error' => 'Invalid form data.'
            ]);
        }
        try {
            $form = FormBuilder::getInstance()->forms->constructFormsFromJson($rawData);
            if($form->uid == null) {
                $form->authorId = $user->id;
            }
            FormBuilder::getInstance()->forms->saveForm($form);
        } catch (\Exception|Error $error) {
            FormBuilder::log($error->getMessage(), 'error');
            return $this->asFailure("Internal server error ",[
                'success' => false,
                'message' => 'Internal server error.'
            ]);
        }

        if($form->hasErrors()) {
            return $this->asFailure("Failed to save form ",[
                'success' => false,
                'errors' => $form->getErrors(),
            ]);
        }

        $this->setSuccessFlash('Form saved successfully.');
        return $this->asJson(['success' => true, 'message' => 'Form saved successfully.',
            'form' => $form->asArray(),
            'formUrl' => $form->getEditUrl()
        ]);
    }

    /**
     * @throws \Throwable
     * @throws BadRequestHttpException
     */
    public function actionDelete(): Response
    {
        $id = $this->request->getRequiredBodyParam('id');

        try {
            $deleted = FormBuilder::getInstance()->forms->deleteForm((int) $id);

            if ($deleted) {
                return $this->asSuccess('Form deleted successfully.');
            }

            // If deleteForm returns false but doesn't throw an exception
            throw new BadRequestHttpException("Failed to delete form with ID {$id}.");
        } catch (\Throwable $e) {
            return $this->asFailure($e->getMessage());
        }
    }
    /**
     * @throws MethodNotAllowedHttpException
     * @throws \Exception
     */
    public function actionPreview(): Response
    {
        $this->requirePostRequest();
        $request = Craft::$app->getRequest();

        $rawData = $request->getBodyParam('form');

        $form = FormBuilder::getInstance()->forms->constructFormsFromJson($rawData);
        $submission = new Submission($form);
        $form->uid = $formJson['uid'] ?? StringHelper::UUID();
        $this->view->on(View::EVENT_BEFORE_RENDER_TEMPLATE, function ($e) {
            $e->sender->assetBundles = [];
        });
        return $this->renderTemplate('form-builder/_render/preview', [
            'form' => $form, 'submission' => $submission, 'preview' => true,
        ], View::TEMPLATE_MODE_CP);
    }


    /**
     * @throws BadRequestHttpException
     * @throws InvalidConfigException
     */
    public function actionTableData(): Response
    {
        $this->requireAcceptsJson();

        $forms = FormBuilder::getInstance()->forms->getFormsTableData();

        return $this->asJson($forms);
    }
}