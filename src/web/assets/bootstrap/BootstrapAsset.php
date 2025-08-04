<?php

namespace craftyfm\formbuilder\web\assets\bootstrap;
use craft\web\AssetBundle;

class BootstrapAsset extends AssetBundle
{
    public function init(): void
    {
        $this->sourcePath = "@craftyfm/formbuilder/web/assets/bootstrap/dist";

        $this->css = ['css/main.css'];

        parent::init();
    }
}
