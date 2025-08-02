<?php

namespace craftyfm\formbuilder\models\form_fields;

use craft\base\Model;
use craftyfm\formbuilder\models\submission_fields\FileUploadField;

class FileUpload extends BaseInput
{
    public static string $type = 'fileUpload';
    public array $allowedExtensions = [];
    public int $limit;
    public int $maxSize;

    public function __construct($form, $config = [])
    {
        $this->limit = $config['limit'] ?? 1;
        $this->maxSize = $config['maxSize'] ?? 0;
        if (isset($config['allowedExtensions'])) {
            if (is_array($config['allowedExtensions'])) {
                $this->allowedExtensions = $config['allowedExtensions'];
            } else {
                $this->allowedExtensions = explode(',', $config['allowedExtensions'] ?? '') ?? [];
            }
        }
        parent::__construct($form, $config);
    }

    public function createSubmissionField(): FileUploadField
    {
       return new FileUploadField($this);
    }
}
