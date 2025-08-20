<?php

namespace craftyfm\formbuilder\models;

use craft\base\Model;
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

    public function defineRules(): array
    {
        $rules = [];
        $rules[] = [['recipients', 'subject', 'message'], 'required'];
        if ($this->type === self::TYPE_USER) {
            $rules[] = [['templateId'], 'required'];
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
        if ($this->type === self::TYPE_USER) {
            $emailTemplate = FormBuilder::getInstance()->emailTemplates->getById($this->templateId);
            return \Craft::$app->getView()->renderTemplate(
                $emailTemplate->template,
                [
                    'submission' => $submission,
                    'message' => new Markup(nl2br($this->message), 'UTF-8'),
                    'subject' => $this->subject,
                ],
                View::TEMPLATE_MODE_SITE
            );
        }

        return \Craft::$app->getView()->renderTemplate(
            "form-builder/_email-notification/$this->type",
            [
                'submission' => $submission,
                'message' => $this->message,
                'subject' => $this->subject,
            ]
        );
    }
}