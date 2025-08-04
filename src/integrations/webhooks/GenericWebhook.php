<?php

namespace craftyfm\formbuilder\integrations\webhooks;

use Craft;
use craftyfm\formbuilder\models\IntegrationResult;
use craftyfm\formbuilder\models\Submission;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use yii\base\Exception;

class GenericWebhook extends BaseWebhook
{

    public function getDisplayName(): string
    {
        return "Generic Webhook";
    }
    /**
     * @throws SyntaxError
     * @throws Exception
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function getSettingsHtml(): string
    {
        $view = Craft::$app->getView();

        return $view->renderTemplate('form-builder/_integrations/webhook/generic/settings', [
            'integration' => $this,
        ]);
    }

    protected function executeIntegration(Submission $submission): IntegrationResult
    {
        $result = new IntegrationResult();

        $url = $this->webhookUrl ?? null;

        if (!$url) {
            $result->success = false;
            $result->message = Craft::t('form-builder', 'No webhook URL configured.');
            return $result;
        }

        try {
            $client = Craft::createGuzzleClient([
                'timeout' => 10,
            ]);

            $payload = $this->generateSubmissionPayload($submission);

            $response = $client->post($url, [
                'json' => $payload,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ],
            ]);

            if ($response->getStatusCode() >= 200 && $response->getStatusCode() < 300) {
                $result->success = true;
                $result->data = json_decode((string) $response->getBody(), true);
                return $result;
            }
            $result->success = false;
            $result->data = json_decode((string) $response->getBody(), true);
            return $result;
        } catch (\Throwable $e) {
            Craft::error("Webhook integration error: " . $e->getMessage(), __METHOD__);
            $result->success = false;
            $result->exception = $e;
            return $result;
        }
    }
}