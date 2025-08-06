<?php

namespace craftyfm\formbuilder\services;

use Craft;
use craft\base\Component;
use craftyfm\formbuilder\models\EmailNotification as EmailNotificationModel;
use craftyfm\formbuilder\models\Submission;
use craftyfm\formbuilder\records\EmailNotificationRecord;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use yii\base\InvalidConfigException;
use yii\db\Exception;
use yii\db\StaleObjectException;

class EmailNotification extends Component
{
    public function getNotificationByFormId(int $formId, string $type = 'notification'): ?EmailNotificationModel
    {
        $record = EmailNotificationRecord::findOne(['formId' => $formId,  'type' => $type]);
        if (!$record) {
            return null;
        }

        return new EmailNotificationModel($record->toArray());
    }

    public function getNotificationIdByFormId(int $formId, string $type = 'notification'): ?int
    {
        $record = EmailNotificationRecord::find()
            ->where(['formId' => $formId, 'type' => $type])
            ->select('id')->asArray()->one();
        return $record['id'];
    }


    /**
     * @throws Exception
     */
    public function saveNotification(EmailNotificationModel $model): bool
    {
        $record = $model->id ? EmailNotificationRecord::findOne($model->id) : new EmailNotificationRecord();

        if (!$record) {
            return false;
        }

        $record->formId = $model->formId;
        $record->recipients = $model->recipients;
        $record->message = $model->message;
        $record->subject = $model->subject;
        $record->enabled = $model->enabled;
        $record->type = $model->type;

        return $record->save(false);
    }

    /**
     * @throws StaleObjectException
     * @throws \Throwable
     */
    public function deleteNotification(int $id): bool
    {
        $record = EmailNotificationRecord::findOne($id);
        return (bool)$record?->delete();
    }

    /**
     * @param EmailNotificationModel $model
     * @param Submission $submission
     * @return bool
     * @throws InvalidConfigException
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     * @throws \yii\base\Exception
     */
    public function sendNotification(EmailNotificationModel $model, Submission $submission): bool
    {
        if (!$model->enabled || empty($model->recipients)) {
            return false;
        }

        $mailer = Craft::$app->getMailer();
        $message = $mailer->compose()
            ->setTo(explode(',', $model->recipients))
            ->setSubject($model->subject)
            ->setHtmlBody($model->getBodyHtml($submission));

        return $message->send();
    }
}