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
        $this->_checkAllowedExtensions($config);
        parent::__construct($form, $config);
    }


    public function createSubmissionField(): FileUploadField
    {
       return new FileUploadField($this);
    }

    private function _checkAllowedExtensions($config): void
    {
        if (isset($config['allowedExtensions'])) {
            if (is_array($config['allowedExtensions'])) {
                $this->allowedExtensions = array_filter(
                    $config['allowedExtensions'],
                    fn($ext) => $ext !== ''
                );
            } else {
                $this->allowedExtensions = array_filter(
                    array_map('trim', explode(',', $config['allowedExtensions'])),
                    fn($ext) => $ext !== ''
                );
            }
        }
    }
}
