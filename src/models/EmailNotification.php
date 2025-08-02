<?php

namespace craftyfm\formbuilder\models;

use craft\base\Model;
use DateTime;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use yii\base\Exception;

class EmailNotification extends Model
{
    public const TYPE_NOTIFICATION = 'notification';
    public ?int $id = null;
    public ?string $recipients = null;
    public ?string $subject = null;
    public string $message = '';
    public ?string $uid = null;
    public bool $enabled = false;
    public string $type = self::TYPE_NOTIFICATION;
    public ?int $formId = null;
    public ?DateTime $dateUpdated = null;
    public ?DateTime $dateCreated = null;
    /**
     * @throws SyntaxError
     * @throws Exception
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function getBodyHtml(Submission $submission): string
    {
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