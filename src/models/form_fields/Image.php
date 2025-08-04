<?php

namespace craftyfm\formbuilder\models\form_fields;

class Image extends Base
{
    public static string $type = 'image';
    public string $src;
    public string $alt ;
    public string $align;
    public ?int $width ;
    public ?int $height;

    public function __construct($form, $config = [])
    {
        $this->src = $config['src'];
        $this->alt = $config['alt'] ?? '';
        $this->width = intval($config['width']) ?? null;
        $this->height = intval($config['height']) ?? null;
        $this->align = $config['alignment'] ?? '';

        parent::__construct($form, $config);
    }

}
