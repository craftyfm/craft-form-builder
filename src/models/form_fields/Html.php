<?php

namespace craftyfm\formbuilder\models\form_fields;

use craft\helpers\HtmlPurifier;

class Html extends Base
{
    public static string $type = 'html';
    public string $html = '';

    public function __construct($form, $config = [])
    {
        if (isset($config['html'])) {
            $this->html = HtmlPurifier::process($config['html'], []);
        }
        parent::__construct($form, $config);
    }

}
