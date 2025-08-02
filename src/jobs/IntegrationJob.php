<?php

namespace craftyfm\formbuilder\jobs;

use Craft;
use craft\queue\BaseJob;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\models\Submission;
use craftyfm\formbuilder\services\Submissions;
use yii\base\Model;
use yii\queue\Queue;
use yii\base\InvalidConfigException;

class IntegrationJob extends BaseJob
{
    public ?int $submissionId = null;
    public string $integrationHandle = '';
    /**
     */
    public function execute($queue): void
    {

        if (!$this->submissionId) {
            return;
        }

        if (!$this->integrationHandle) {
            return;
        }

        $submission = FormBuilder::getInstance()->submissions->getSubmissionById($this->submissionId);

        if (!$submission) {
            return;
        }

        $integrations = $submission->getForm()->integrations;
        if (!isset($integrations[$this->integrationHandle])) {
            return;
        }

        $integration = $integrations[$this->integrationHandle];

        if(!$integration->enabled) {
            return;
        }
        FormBuilder::getInstance()->integrations->runIntegration($integration, $submission);
    }

    protected function defaultDescription(): string
    {
        return "Sending form Integration for submission #{$this->submissionId}";
    }
}
