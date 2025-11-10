<?php

namespace craftyfm\formbuilder\variables;

use craftyfm\formbuilder\FormBuilder as Plugin;
use craftyfm\formbuilder\models\Form;
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
    public function renderForm($formHandle): Markup
    {
        return Plugin::getInstance()->forms->renderFormByHandle($formHandle);
    }

    /**
     * @throws \Exception
     */
    public function getForm(string $formHandle): ?Form
    {
        return Plugin::getInstance()->forms->getFormByHandle($formHandle);
    }
}