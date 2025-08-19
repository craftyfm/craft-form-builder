<?php

namespace craftyfm\formbuilder\controllers;

use Craft;
use craft\errors\BusyResourceException;
use craft\errors\StaleResourceException;
use craft\web\Controller;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\models\SubmissionStatus;
use yii\base\ErrorException;
use yii\base\Exception;
use yii\base\InvalidConfigException;
use yii\base\NotSupportedException;
use yii\web\BadRequestHttpException;
use yii\web\MethodNotAllowedHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;
use yii\web\ServerErrorHttpException;

;

class SubmissionStatusController extends Controller
{
    protected array|int|bool $allowAnonymous = false;

    public function actionIndex(): Response
    {
        $statuses = FormBuilder::getInstance()->submissionStatuses->getAll();

        $array = [];
        foreach ($statuses as $status) {
            $array[] = [
                'id' => $status->id,
                'title' => [
                    'html' => "<span class='status {$status->color}'></span>" . $status->name,
                    'url' => $status->getCpEditUrl()
                ],
                'description' => $status->description,
                'handle' => $status->handle,
                'color' => $status->color,
                'isDefault' => $status->isDefault,
            ];
        }

        return $this->renderTemplate('form-builder/settings/statuses/index', [
            'statuses' => $array,
            'currentPage' => 'submission-status',
        ]);
    }

    /**
     * @throws NotFoundHttpException
     */
    public function actionEdit(string $uid = null, SubmissionStatus $status = null): Response
    {
        $service = FormBuilder::getInstance()->submissionStatuses;

        if (!$status) {
            $status = $uid ? ($service->getByUid($uid) ?? null) : new SubmissionStatus(['uid' => null]);
            if (!$status) {
                throw new NotFoundHttpException('Status not found');
            }
        }

        return $this->renderTemplate('form-builder/settings/statuses/_edit', [
            'status' => $status,
            'currentPage' => 'submission-status',
        ]);
    }

    /**
     * @return Response|null
     * @throws MethodNotAllowedHttpException
     * @throws BusyResourceException
     * @throws StaleResourceException
     * @throws ErrorException
     * @throws Exception
     * @throws InvalidConfigException
     * @throws NotSupportedException
     * @throws ServerErrorHttpException
     */
    public function actionSave(): ?Response
    {
        $this->requirePostRequest();
        $request = $this->request;

        $id = $request->getBodyParam('id') ?? null;

        $status = new SubmissionStatus([
            'id' => $id,
            'name' => $request->getBodyParam('name'),
            'handle' => $request->getBodyParam('handle'),
            'color' => $request->getBodyParam('color'),
            'description' => $request->getBodyParam('description'),
            'isDefault' => (bool) $request->getBodyParam('isDefault'),
        ]);

        $service = FormBuilder::getInstance()->submissionStatuses;

        if (!$service->saveStatus($status)) {
            return $this->asFailure("Could not save status.", ['errors' => $service->getErrors()],
                ['status' => $status, 'currentPage' => 'submission-status',]
            );
        }

        return $this->asSuccess("Status saved.", [
            'status' => $status,
            'currentPage' => 'submission-status',
        ]);
    }

    /**
     * @throws BadRequestHttpException
     * @throws MethodNotAllowedHttpException
     */
    public function actionDelete(): Response
    {
        $this->requirePostRequest();
        $id = Craft::$app->getRequest()->getRequiredBodyParam('id');

        $status = FormBuilder::getInstance()->submissionStatuses->getById($id);
        if ($status) {
            FormBuilder::getInstance()->submissionStatuses->deleteStatus($status);
            return $this->asSuccess('Status deleted successfully.');
        }
        return $this->redirectToPostedUrl();
    }
}
