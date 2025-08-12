<?php

namespace craftyfm\formbuilder\jobs;

use craft\queue\BaseJob;
use craftyfm\formbuilder\FormBuilder;

class IntegrationJob extends BaseJob
{
    public ?int $submissionId = null;
    public ?int $integrationId = null;
    /**
     */
    public function execute($queue): void
    {

        if ($this->submissionId == null) {
            return;
        }

        if ($this->integrationId == null) {
            return;
        }

        $submission = FormBuilder::getInstance()->submissions->getSubmissionById($this->submissionId);

        if (!$submission) {
            return;
        }

        $integration = FormBuilder::getInstance()->formIntegrations->getIntegrationForForm($submission->getForm()->id, $this->integrationId);

        if (!$integration) {
            return;
        }

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
