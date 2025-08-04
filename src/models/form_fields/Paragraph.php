<?php

namespace craftyfm\formbuilder\models\form_fields;

class Paragraph extends Base
{
    public static string $type = 'paragraph';
    public string $text;
    public string $align;

    public function __construct($form, $config = [])
    {
        $this->text = $config['text'] ?? '';
        $this->align = $config['align'] ?? 'left';
        parent::__construct($form, $config);
    }

}
