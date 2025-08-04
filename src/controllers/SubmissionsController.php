<?php

namespace craftyfm\formbuilder\controllers;

use Craft;
use craft\helpers\Html;
use craft\helpers\UrlHelper;
use craft\web\Controller;
use craft\web\Request;
use craft\web\UploadedFile;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\models\form_fields\Checkbox;
use craftyfm\formbuilder\models\form_fields\Checkboxes;
use craftyfm\formbuilder\models\form_fields\Email;
use craftyfm\formbuilder\models\form_fields\FileUpload;
use craftyfm\formbuilder\models\form_fields\Number;
use craftyfm\formbuilder\models\form_fields\Phone;
use craftyfm\formbuilder\models\form_fields\Radio;
use craftyfm\formbuilder\models\form_fields\Select;
use craftyfm\formbuilder\models\form_fields\Text;
use craftyfm\formbuilder\models\form_fields\TextArea;
use craftyfm\formbuilder\models\form_fields\Url;
use craftyfm\formbuilder\models\FormSettings;
use craftyfm\formbuilder\models\Submission;
use craftyfm\formbuilder\models\submission_fields\BaseField;
use Throwable;
use yii\base\InvalidConfigException;
use yii\db\Exception;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\MethodNotAllowedHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class SubmissionsController extends Controller
{
    protected array|int|bool $allowAnonymous = ['submit'];

    /**
     * @throws NotFoundHttpException
     * @throws ForbiddenHttpException
     * @throws \Exception
     */
    public function actionIndex(string $handle = null): Response
    {
        $this->requirePermission('form-builder-viewSubmissions');
        $formsService = FormBuilder::getInstance()->forms;
        $allForms = $formsService->getAllForms();

        if (!$handle) {
            return $this->renderTemplate('form-builder/submissions/index', [
                'forms' => $allForms,
                'currentFormId' => null,
            ]);
        }

        $form = $formsService->getFormByHandle($handle);
        if (!$form) {
            throw new NotFoundHttpException('Form not found');
        }

        return $this->renderTemplate('form-builder/submissions/index', [
            'forms' => $allForms,
            'currentFormId' => $form->id,
        ]);
    }



    /**
     * @throws BadRequestHttpException
     * @throws \Exception
     */
    public function actionTableData(): Response
    {
        $this->requireAcceptsJson();
        $this->requirePermission('form-builder-viewSubmissions');
        $formId = $this->request->getQueryParam('formId');
        $page = intval($this->request->getQueryParam('page'));
        $perPage = intval($this->request->getQueryParam('per_page'));
        $submissions = FormBuilder::getInstance()->submissions->getTableData($formId !== null ? intval($formId) : null, $page, $perPage);
        return $this->asJson($submissions);
    }

    /**
     * @throws NotFoundHttpException
     * @throws ForbiddenHttpException
     */
    public function actionView(int $id): Response
    {
        $this->requirePermission('form-builder-viewSubmissions');
        $submission = FormBuilder::getInstance()->submissions->getSubmissionById($id);
        if (!$submission) {
            throw new NotFoundHttpException('Submission not found');
        }

        $setStatuses = [];
        foreach (FormBuilder::getInstance()->submissionStatuses->getAll() as $status) {
            if ($status->id !== $submission->statusId) {
                $setStatuses[] = [
                  'url' => UrlHelper::actionUrl('form-builder/submissions/update-status',[
                      'id' => $submission->id,
                      'statusId' => $status->id,
                  ]),
                  'name' => $status->name,
                  'color' => $status->color,
                ];
            }
        }
        return $this->renderTemplate('form-builder/submissions/view', [
            'submission' => $submission,
            'setStatuses' => $setStatuses

        ]);
    }

    /**
     * @throws ForbiddenHttpException
     * @throws BadRequestHttpException
     */
    public function actionDelete(): Response
    {
        $this->requirePermission('form-builder-deleteSubmissions');
        $id = $this->request->getRequiredBodyParam('id');

        try {
            $deleted = FormBuilder::getInstance()->submissions->deleteSubmission((int) $id);

            if ($deleted) {
                return $this->asSuccess('Submission deleted successfully.');
            }

            // If deleteForm returns false but doesn't throw an exception
            throw new BadRequestHttpException("Failed to submission form with ID {$id}.");
        } catch (Throwable $e) {
            return $this->asFailure($e->getMessage());
        }
    }

    /**
     * @throws ForbiddenHttpException
     * @throws BadRequestHttpException
     * @throws Exception
     */
    public function actionUpdateStatus(): Response
    {
        $this->requirePermission('form-builder-updateSubmissions');
        $id = $this->request->getRequiredParam('id');
        $statusId = $this->request->getRequiredParam('statusId');

        $submission = FormBuilder::getInstance()->submissions->getSubmissionById($id);
        if (!$submission) {
            throw new BadRequestHttpException('Submission not found');
        }

        $res = FormBuilder::getInstance()->submissions->updateSubmissionStatus($submission, $statusId);

        if ($res) {
            return $this->asSuccess('Submission status updated successfully.', [],
                UrlHelper::actionUrl('form-builder/submissions/view', ['id' => $submission->id])
            );
        }

        if ($this->request->getAcceptsJson()) {
            return $this->asFailure('Failed to update submission status.');
        }
        $this->setFailFlash('Failed to update submission status.');
        return $this->redirect(UrlHelper::actionUrl('form-builder/submissions/view', ['id' => $submission->id]));
    }

    /**
     * @throws MethodNotAllowedHttpException
     * @throws BadRequestHttpException
     * @throws \Exception
     */
    public function actionSubmit(): ?Response
    {
        $this->requirePostRequest();
        $request = Craft::$app->getRequest();
        $formId = $request->getBodyParam('formId');
        
        if (!$formId) {
            throw new BadRequestHttpException('Form ID is required');
        }

        // Get the form
        $form = FormBuilder::getInstance()->forms->getFormById($formId);
        if (!$form) {
            throw new BadRequestHttpException('Invalid form ID');
        }

        // Create submission model
        $submission = new Submission($form);
        $defaultStatus = FormBuilder::getInstance()->submissionStatuses->getDefault();
        if ($defaultStatus) {
            $submission->statusId = $defaultStatus->id;
        }
        $submission->setState(Submission::STATE_CREATE);

        // Set IP address
        if ($form->settings->collectIp) {
            $submission->ipAddress = $request->getUserIP() ?? null;
        } else {
            $submission->ipAddress = null;
        }
        // Populate submission fields with sanitized data
        $this->populateSubmissionFields($submission, $request);
        // Validate the submission
        if (!$submission->validate()) {
            return $this->handleValidationErrors($submission, $request);
        }

        // Additional security validations
        $this->validateSecurityChecks($submission, $this->request);

        if ($submission->hasErrors('rateLimit')) {
            return $this->asFailure($submission->getFirstError('rateLimit'));
        }

        if ($submission->hasErrors('captcha')) {
            return $this->asFailure($submission->getFirstError('captcha'));
        }

        // Save submission
        try {
            $saved = FormBuilder::getInstance()->submissions->saveSubmission($submission, false);
            if (!$saved) {
                return $this->asFailure('Failed to save submission');
            }

            // Process integrations if needed
            FormBuilder::getInstance()->submissions->processNotification($submission);
            FormBuilder::getInstance()->submissions->processIntegrations($submission);

            $successMessage = $form->settings->successMessage;
            // Success response
            if ($request->getAcceptsJson()) {
                return $this->asJson([
                    'success' => true,
                    'message' => $successMessage,
                    'submissionId' => $submission->id
                ]);
            }

            // Redirect or render success page
            $successUrl = $form->settings->redirectUrl;
            if ($form->settings->actionOnSubmit === FormSettings::ACTION_REDIRECT && $successUrl) {
                return $this->redirect($successUrl);
            }
            return $this->asSuccess($successMessage);


        } catch (\Exception $e) {
            Craft::error('Form submission error: ' . $e->getMessage(), __METHOD__);
            return $this->asFailure('An error occurred while processing your submission');
        }
    }

    /**
     * Populate submission fields with sanitized request data
     */
    private function populateSubmissionFields(Submission $submission, $request): void
    {
        foreach ($submission->getSubmissionFields() as $fieldName => $field) {
            $rawValue = $request->getBodyParam($fieldName);
            
            // Sanitize and set the value
            $sanitizedValue = $this->sanitizeFieldValue($rawValue, $field);
            $submission->setSubmissionFieldValue($fieldName, $sanitizedValue);
        }
    }

    /**
     * Sanitize field value based on field type
     */
    private function sanitizeFieldValue(mixed $value, BaseField $field): mixed
    {

        $formField = $field->getFormField();
        
        switch ($formField->getType()) {
            case Text::$type:
            case Email::$type:
            case Url::$type:
            case Phone::$type:
            case TextArea::$type:
                // HTML encode to prevent XSS
                return is_string($value) ? Html::encode(trim($value)) : $value;
            case Number::$type:
                return intval($value);
            case Checkbox::$type:
                return $value === '1';
            case Select::$type:
            case Radio::$type:
                // Validate against allowed options
                if (empty($formField->options)) {
                    return null;
                }

                $validValues = array_column($formField->options, 'value');
                return in_array($value, $validValues, true) ? Html::encode($value) : null;


            case Checkboxes::$type:
                // Ensure boolean or array of valid options
                if (is_array($value)) {
                    return array_map(fn($v) => Html::encode($v), $value);
                }
                return [];
                
            case FileUpload::$type:
                // Handle file uploads
                return $this->handleFileUpload($formField->handle);
                
            default:
                return is_string($value) ? Html::encode($value) : $value;
        }
    }

    /**
     * Handle file upload
     */
    private function handleFileUpload(string $fieldName): ?array
    {
        return UploadedFile::getInstancesByName($fieldName);
    }

    /**
     * Additional security validations
     */
    private function validateSecurityChecks(Submission $submission, Request $request): void
    {
        // Rate limiting check
        if (!$this->checkRateLimit($submission, $request)) {
            return;
        }

        // Spam detection
//        if ($this->detectSpam($submission)) {
//            return false;
//        }

        // CAPTCHA validation if enabled
        $this->validateCaptcha($submission, $request);

    }

    /**
     * Check rate limiting
     */
    private function checkRateLimit(Submission $submission, Request $request): bool
    {
        if (!FormBuilder::getInstance()->getSettings()->enableRateLimit) {
            return true;
        }
        $ipAddr = $request->getUserIP();
        if (!$ipAddr) {
            return true;
        }

        $cache = Craft::$app->getCache();
        $key = 'craftyfm_form_builder_submission_' . $ipAddr ;
        $attempts = $cache->get($key) ?: 0;
        $maxAttempts = FormBuilder::getInstance()->getSettings()->maxAttemptsPerIp;
        if ($attempts >= $maxAttempts) { // Max 5 submissions per minute
            $submission->addError('rateLimit', FormBuilder::getInstance()->getSettings()->rateLimitMessage);
            return false;
        }

        $duration = FormBuilder::getInstance()->getSettings()->rateLimitTimeWindow;
        $cache->set($key, $attempts + 1, $duration); // 1 minute cache
        return true;
    }

    /**
     * Basic spam detection
     */
    private function detectSpam(Submission $submission): bool
    {
        $suspiciousPatterns = [
            '/\b(?:viagra|casino|poker|lottery)\b/i',
            '/https?:\/\/[^\s]+/i', // URLs in form fields
            '/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/', // Credit card patterns
        ];

        foreach ($submission->getSubmissionFields() as $field) {
            $value = $field->value;
            if (is_string($value)) {
                foreach ($suspiciousPatterns as $pattern) {
                    if (preg_match($pattern, $value)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * Validate CAPTCHA if present
     */
    private function validateCaptcha(Submission $submission, Request $request): void
    {

        if (!$submission->captcha) {
            return;
        }
        if (!$submission->captcha->verifyRequest($request)) {
            $submission->addError('captcha', $submission->captcha->errorMessage);
        }


        // No CAPTCHA required
    }

    /**
     * Validate CAPTCHA response with service
     */
    private function validateCaptchaResponse(string $response, string $type): bool
    {
        // Implement CAPTCHA validation logic
        // This is a placeholder - implement according to your CAPTCHA service
        return true;
    }

    /**
     * Handle validation errors
     * @throws BadRequestHttpException
     */
    private function handleValidationErrors(Submission $submission, $request): ?Response
    {
        if ($request->getAcceptsJson()) {
            return $this->asJson([
                'success' => false,
                'errors' => $submission->getErrors(),
                'values' => $this->getFieldValues($submission)
            ]);
        }

        // For non-AJAX requests, redirect back with errors
        Craft::$app->getUrlManager()->setRouteParams([
            'submission' => $submission,
            'errors' => $submission->getErrors()
        ]);

        return null;
    }

    /**
     * Get field values for repopulating form
     */
    private function getFieldValues(Submission $submission): array
    {
        return array_map(function ($field) {
            return $field->getValue();
        }, $submission->getSubmissionFields());
    }

    /**
     * Process integrations (webhooks, etc.)
     */
    private function processIntegrations(Submission $submission): void
    {
        // Process integrations in background or queue
        // This is where you'd call your FileMaker integration or other webhooks
        try {
            // Example: Queue job for processing integrations
            // Craft::$app->getQueue()->push(new ProcessSubmissionIntegrations([
            //     'submissionId' => $submission->id
            // ]));
        } catch (\Exception $e) {
            // Log integration errors but don't fail the submission
            Craft::error('Integration processing error: ' . $e->getMessage(), __METHOD__);
        }
    }
}