<?php

namespace craftyfm\formbuilder\models;

use craft\base\Model;
use craft\helpers\Html;
use craft\web\View;
use craftyfm\formbuilder\FormBuilder;
use DateTime;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Markup;
use yii\base\Exception;

class EmailNotification extends Model
{
    public const TYPE_ADMIN = 'admin';
    public const TYPE_USER = 'user';
    public ?int $id = null;
    public ?string $recipients = null;
    public ?string $subject = null;
    public string $message = '';
    public ?string $uid = null;
    public ?int $templateId = null;
    public bool $enabled = false;
    public string $type = self::TYPE_ADMIN;
    public ?int $formId = null;
    public ?DateTime $dateUpdated = null;
    public ?DateTime $dateCreated = null;

    public function getRecipients(Submission $submission): mixed
    {
        if ($this->type === self::TYPE_USER) {
            return $submission->getSubmissionFieldValueById($this->recipients);
        }
        return explode(',', $this->recipients);
    }

    /**
     * Replace {handle} tokens with individual submitted field values, and {submission} with
     * a "Label: value" summary of every submitted field.
     */
    public function resolveTokens(string $text, Submission $submission): string
    {
        $tokens = [];
        foreach ($submission->getFieldDisplayValues() as $handle => $value) {
            $tokens['{' . $handle . '}'] = $value;
        }
        $text = strtr($text, $tokens);

        return str_replace('{submission}', $submission->getFormattedSummary(), $text);
    }

    public function rules(): array
    {
        return $this->defineRules();
    }

    public function defineRules(): array
    {
        $rules = [];
        if ($this->enabled) {
            $rules[] = [['recipients', 'subject', 'message'], 'required'];
            if ($this->type === self::TYPE_USER) {
                $rules[] = [['templateId'], 'required'];
            }
        }
        return $rules;
    }

    /**
     * @throws SyntaxError
     * @throws Exception
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function getBodyHtml(Submission $submission): string
    {
        $message = $this->resolveTokens($this->message, $submission);

        if ($this->type === self::TYPE_USER) {
            $emailTemplate = FormBuilder::getInstance()->emailTemplates->getById($this->templateId);
            if (!$emailTemplate) {
                throw new Exception('No email template is selected for this User Notification. Choose one in the form\'s User Notification settings.');
            }
            return \Craft::$app->getView()->renderTemplate(
                $emailTemplate->template,
                [
                    'submission' => $submission,
                    'message' => new Markup(nl2br(Html::encode($message)), 'UTF-8'),
                    'subject' => $this->getResolvedSubject($submission),
                ],
                View::TEMPLATE_MODE_SITE
            );
        }

        return \Craft::$app->getView()->renderTemplate(
            "form-builder/_email-notification/$this->type",
            [
                'submission' => $submission,
                'message' => $message,
                'subject' => $this->getResolvedSubject($submission),
            ],
            View::TEMPLATE_MODE_CP
        );
    }

    public function getResolvedSubject(Submission $submission): string
    {
        return $this->resolveTokens($this->subject ?? '', $submission);
    }
}