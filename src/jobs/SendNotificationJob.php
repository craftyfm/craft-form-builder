<?php

namespace craftyfm\formbuilder\jobs;

use craft\queue\BaseJob;
use craftyfm\formbuilder\FormBuilder;
use yii\base\InvalidConfigException;

class SendNotificationJob extends BaseJob
{
    public ?int $submissionId = null;

    /**
     * @throws InvalidConfigException
     */
    public function execute($queue): void
    {
        if (!$this->submissionId) {
            return;
        }

        $submission = FormBuilder::getInstance()->submissions->getSubmissionById($this->submissionId);

        if (!$submission) {
            return;
        }
        $adminEmailNotif = $submission->getForm()->getAdminNotif();
        if (!$adminEmailNotif->enabled || empty($adminEmailNotif->recipients)) {
            return;
        }

        FormBuilder::getInstance()->emailNotification->sendNotification($adminEmailNotif, $submission);





    }

    protected function defaultDescription(): string
    {
        return "Sending form notification for submission #{$this->submissionId}";
    }
}
