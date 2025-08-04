<?php

namespace craftyfm\formbuilder\services;

use Craft;
use craft\base\Component;
use craft\elements\Asset;
use craft\errors\VolumeException;
use craft\helpers\Assets;
use craft\models\Volume;
use craft\web\UploadedFile;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\models\Submission;
use yii\base\Exception;

class Upload extends Component
{
    public function getVolume(): ?Volume
    {
        $volumeId = FormBuilder::getInstance()->getSettings()->uploadVolumeId;

        if (!$volumeId) {
            return null;
        }

        return Craft::$app->getVolumes()->getVolumeById($volumeId);
    }

    /**
     * @throws Exception
     * @throws VolumeException
     * @throws \Exception
     * @throws \Throwable
     */
    public function uploadFile(UploadedFile $file, Submission $submission, string $fieldName): ?Asset
    {
        $volume = $this->getVolume();


        if (!$volume) {
            Craft::error('Upload failed: Volume not found or file does not exist.', __METHOD__);
            throw new Exception('Upload failed: Volume not found ');
        }

        $formId = $submission->getForm()->uid;
        $assetsService = Craft::$app->getAssets();

        // Build folder path: formId/submissionId
        $folderPath = "$formId";
        // Ensure folders exist (will create them if not)
        $targetFolder = $assetsService->ensureFolderByFullPathAndVolume($folderPath, $volume);

        $tempName = $fieldName . '_'. uniqid() .'.' . $file->extension;

        $asset = new Asset();
        $asset->tempFilePath = $file->tempName;
        $asset->filename = Assets::prepareAssetName($tempName);
        $asset->newFolderId = $targetFolder->id;
        $asset->volumeId = $volume->id;
        if (!Craft::$app->elements->saveElement($asset)) {
            Craft::error('Failed to save asset: ' . json_encode($asset->getErrors()), __METHOD__);
            throw new Exception('Failed to save asset');
        }

        return $asset;
    }


}