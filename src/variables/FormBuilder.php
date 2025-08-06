<?php

namespace craftyfm\formbuilder\variables;

use craftyfm\formbuilder\FormBuilder as Plugin;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Markup;
use yii\base\Exception;

class FormBuilder
{

    /**
     * @throws SyntaxError
     * @throws Exception
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function renderForm($formHandle, $loadAsset = false): Markup
    {
        return Plugin::getInstance()->forms->renderFormByHandle($formHandle, $loadAsset);
    }
}