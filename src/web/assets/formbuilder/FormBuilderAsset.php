<?php

namespace craftyfm\formbuilder\web\assets\formbuilder;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;
use craft\web\View;
use yii\web\View as ViewAlias;

class FormBuilderAsset extends AssetBundle
{
    public function init(): void
    {
        $this->sourcePath = "@craftyfm/formbuilder/web/assets/formbuilder/dist";

        $this->css = ['css/main.css'];
        $this->js = ['js/main.js'];
        $this->jsOptions = [
            'type' => 'module',
            'position' => ViewAlias::POS_END,
        ];
        parent::init();
    }
}
