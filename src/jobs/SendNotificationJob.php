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
            FormBuilder::log('SendNotificationJob: no submissionId given.', 'info');
            return;
        }
        $submission = FormBuilder::getInstance()->submissions->getSubmissionById($this->submissionId);

        if (!$submission) {
            FormBuilder::log("SendNotificationJob: submission #{$this->submissionId} not found.", 'info');
            return;
        }

        $adminEmailNotif = $submission->getForm()->getAdminNotif();
        if ($adminEmailNotif->enabled) {
            if (!$adminEmailNotif->validate()) {
                FormBuilder::log("Admin notification for submission #{$this->submissionId} skipped, invalid settings: " . json_encode($adminEmailNotif->getErrors()), 'info');
            } else {
                FormBuilder::getInstance()->emailNotification->sendNotification($adminEmailNotif, $submission);
            }
        }

        $userEmailNotif = $submission->getForm()->getUserNotif();
        if (!$userEmailNotif->enabled) {
            return;
        }
        if (!$userEmailNotif->validate()) {
            FormBuilder::log("User notification for submission #{$this->submissionId} skipped, invalid settings: " . json_encode($userEmailNotif->getErrors()), 'info');
            return;
        }
        FormBuilder::getInstance()->emailNotification->sendNotification($userEmailNotif, $submission);
    }

    protected function defaultDescription(): string
    {
        return "Sending form notification for submission #{$this->submissionId}";
    }
}
