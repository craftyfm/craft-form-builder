<?php

namespace craftyfm\formbuilder\integrations\misc;

use craft\helpers\UrlHelper;
use craftyfm\formbuilder\integrations\base\BaseIntegration;

abstract class BaseMisc extends BaseIntegration
{
    public function getTypeName(): string
    {
        return 'Miscellaneous';
    }
    public function getType(): string
    {
        return self::TYPE_MISC;
    }

    public function getCpEditUrl(): ?string
    {
        return UrlHelper::cpUrl('form-builder/settings/misc/edit/' . $this->id);
    }

}