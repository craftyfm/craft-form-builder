<?php

namespace craftyfm\formbuilder\models\form_fields;

class Title extends Base
{
    public static string $type = 'title';
    public string $text = '';
    public string $level = 'h1';
    public string $align = 'start';

    public function __construct($form, $config = [])
    {
        $this->text = $config['text'] ?? $this->text;
        $this->level = $config['level'] ?? $this->level;
        $this->align = $confi['alignment'] ?? $this->align;
        parent::__construct($form, $config);
    }

}
