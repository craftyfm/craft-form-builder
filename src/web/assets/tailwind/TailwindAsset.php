<?php

namespace craftyfm\formbuilder\web\assets\tailwind;
use craft\web\AssetBundle;

class TailwindAsset extends AssetBundle
{
    public function init(): void
    {
        $this->sourcePath = "@craftyfm/formbuilder/web/assets/tailwind/dist";

        $this->css = ['css/main.css'];

        parent::init();
    }
}
