<?php

namespace craftyfm\formbuilder\models\submission_fields;

use craft\elements\Asset;
use craftyfm\formbuilder\models\form_fields\BaseInput;
use craftyfm\formbuilder\models\form_fields\FileUpload;
use yii\web\UploadedFile;

/**
 * @property-read UploadedFile[] $uploadedFiles
 */
class FileUploadField extends BaseField
{

    private array $_uploadedFiles = [];
    private array $_assetIds = [];

    private array $_assets = [];

    /** @var FileUpload $formField */
    protected BaseInput $formField;

    public function setAssetIds(array $assetIds): void
    {
        $this->_assetIds = $assetIds;
    }

    public function getValue(): array
    {
        if (empty($this->_assetIds)) {
            return [];
        }

        if (!empty($this->_assets)) {
            return $this->_assets;
        }

        $this->_assets = Asset::find()->id($this->_assetIds)->all();

        return $this->_assets;

    }


    public function rules(): array
    {
        $rules = [];
        if ($this->formField->required) {
            $rules[] = ['uploadedFiles', function($attribute) {
                if (empty($this->$attribute) || count($this->$attribute) === 0) {
                    $this->addError($attribute, 'At least one file must be uploaded.');
                }
            }, 'skipOnEmpty' => false];

        }

        if ($this->formField->limit > 1) {
            $limit = $this->formField->limit;
            $rules[] = [
                'uploadedFiles',
                function ($attribute) use ($limit){
                    if (is_array($this->$attribute) && count($this->$attribute) > $limit) {
                        $this->addError($attribute, "Maximum of {$limit} selections allowed.");
                    }
                }
            ];
        }

        if ($this->formField->maxSize > 0) {
            $maxSize = $this->formField->maxSize * 1024 * 1024;
            $rules[] = [
                'uploadedFiles',
                'each',
                'rule' => [function ($attribute, $params, $validator, $value) use ($maxSize) {
                    if ($value instanceof UploadedFile) {
                        if ($value->size > $maxSize) {
                            $this->addError($attribute, "File size exceeds the maximum of {$maxSize} MB.");
                        }
                    }
                }]
            ];
        }


        if ($this->formField->allowedExtensions) {
            $allowed = $this->formField->allowedExtensions;;
            $rules[] = [
                'uploadedFiles',
                'each',
                'rule' => [
                    function ($attribute, $params, $validator, $value) use ($allowed) {
                        if ($value instanceof \craft\web\UploadedFile && !in_array($value->extension, $allowed)) {
                            $this->addError($attribute, "Only these file types are allowed: " . implode(', ', $allowed));
                        }
                    }
                ]
            ];
        }


        return $rules;
    }

    public function setUploadedFiles(array $uploadedFiles): void
    {
        $this->_uploadedFiles = $uploadedFiles;
    }
    public function getUploadedFiles(): array
    {
        return $this->_uploadedFiles;
    }

    public function compileSaveData(): array
    {
       if (!empty($this->_assetIds)) {
           return $this->_assetIds;
       }

       foreach ($this->_assets as $file) {
           $this->_assetIds[] = $file->id;
       }
       return $this->_assetIds;
    }

    public function setValue($value): void
    {
        $this->_assetIds = [];
        $this->_assets = [];

        if (is_array($value)) {
            if (!empty($value)) {
                // Check type of the first item to determine what we're dealing with
                $firstItem = $value[0];

                if ($firstItem instanceof Asset) {
                    // It's an array of Asset objects
                    foreach ($value as $asset) {
                        $this->_assetIds[] = $asset->id;
                    }
                    $this->_assets = $value;

                } elseif (is_int($firstItem)) {
                    // It's an array of integers (IDs)
                    $this->_assetIds = $value;

                    // Optional: eager load the actual Asset elements
                    $this->_assets = Asset::find()
                        ->id($value)
                        ->all();
                }
            }
        }
    }


    public function setDraftValues($value): void
    {
        $this->_uploadedFiles = $value;
    }

    public function getValueAsJson($encode = false): false|array|string
    {
        $payload = [];
        foreach ($this->_assets as $asset) {
            $payload[] = [
                'id' => $asset->id,
                'filename' => $asset->filename,
                'cpUrl' => $asset->getCpEditUrl(),
            ];
        }
        return $encode ? json_encode($payload) : $payload;
    }
}