<?php

namespace craftyfm\formbuilder\services;

use Craft;
use craft\base\Component;

class Icons extends Component
{
    public function listAvailableIconSets(): array
    {
        $iconSets = [];
        $iconify = Craft::$app->plugins->getPlugin('iconify');

        if ($iconify) {
            // Call the plugin's public method or access its services
            $iconifySettings = $iconify->getSettings();

            foreach ($iconify->iconify->getIconSets($iconifySettings->iconSets) as $iconSet => $iconSetInfo) {
                $iconSets[$iconSet] = $iconSetInfo['name'];
            }
        }

        return $iconSets;
    }
    public function getIcons(string $set) : array
    {

        $iconify = Craft::$app->plugins->getPlugin('iconify');
        if  (!$iconify) {
            return [];
        }

        $icons = [];
        $params = ['set' => $set];
        $iconModels = $iconify->icons->getIconsModel($params);

        foreach ($iconModels as $iconModel) {
            $svg = $iconify->icons->getIconSvgMarkup($iconModel->name, $iconModel->set);
            $icons[$iconModel->name] = $svg;
        }
        return $icons;
    }

    public function getIconMarkup(string $iconName, string $iconSet): string
    {
        $iconify = Craft::$app->plugins->getPlugin('iconify');
        if  (!$iconify) {
            return '';
        }
        return $iconify->icons->getIconSvgMarkup($iconName, $iconSet);
    }
}