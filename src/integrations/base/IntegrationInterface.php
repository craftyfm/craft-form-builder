<?php

namespace craftyfm\formbuilder\integrations\base;

use craft\base\SavableComponentInterface;
use craftyfm\formbuilder\models\IntegrationResult;
use craftyfm\formbuilder\models\Submission;

interface IntegrationInterface extends SavableComponentInterface
{
    /**
     * Get the display name for this integration
     */
    public function getDisplayName(): string;

    /**
     * Get the integration type
     */
    public function getType(): string;

    /**
     * Get the integration handle
     */
    public function getHandle(): string;

    /**
     * Execute the integration with form data
     */
    public function execute(Submission $submission): IntegrationResult;


    /**
     * Test the integration connection
     */
    public function testConnection(): bool;

    public function getSettingsHtml(): string;

}