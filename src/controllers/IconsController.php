<?php

namespace craftyfm\formbuilder\controllers;

use Craft;
use craft\helpers\Html;
use craft\helpers\Search;
use craft\web\Controller;
use yii\web\BadRequestHttpException;

class IconsController extends Controller
{

    protected int|bool|array $allowAnonymous = true;

    /**
     * @throws BadRequestHttpException
     */
    public function actionPicker()
    {
        $this->requireCpRequest();
        $this->requireAcceptsJson();

        $perPage = 500;
        $iconify = Craft::$app->plugins->getPlugin('iconify');
        $search = $this->request->getRequiredBodyParam('search');
        $set = $this->request->getRequiredBodyParam('set');
        $page = (int)$this->request->getBodyParam('page') ? (int)$this->request->getBodyParam('page') : 1;
        $noSearch = $search === '';
        $affixId = $this->request->getBodyParam('affix');
        $affixes = $iconify->icons->getIconSetAffixes($set);

        $affixOptions = [
            '' => 'All'
        ];

        foreach ($affixes as $affix) {
            $affixOptions[$affix['id']] = $affix['name'];
        }

        $searchTerms = explode(' ', Search::normalizeKeywords($search));
        $params = ['set' => $set];
        if ($affixId && $affixId !== '') {
            $params['affixId'] = $affixId;
        }
        $icons = $iconify->icons->getIconsModel($params, $perPage, ($page - 1) * $perPage);

        $output = [];
        $scores = [];
        foreach ($icons as $icon) {
            if ($searchTerms) {
                $score = $this->matchTerms($searchTerms, $icon->name) * 5;
                if ($score === 0) {
                    continue;
                }
                $scores[] = $score;
            }

            $svg = $iconify->icons->getIconSvgMarkup($icon->name, $icon->set);
            $output[] =
                Html::button($svg, [
                    'class' => 'cfb:p-2 cfb:hover:bg-gray-200 cfb:rounded cfb:flex cfb:flex-col cfb:items-center cfb:justify-center',
                    'title' => $icon->name,
                    'data-iconName' => "$icon->name",
                    'data-iconSet' => "$icon->set",
                    'aria' => [
                        'label' => $icon->name,
                    ],
                ]);
        }

        if ($searchTerms) {
            array_multisort($scores, SORT_DESC, $output);
        }

        $listHtml = implode('', $output);

        return $this->asJson([
            'listHtml' => $listHtml,
            'affixOptions' => $affixOptions,
            'selectedAffix' => $affixId,
        ]);
    }

    private function matchTerms(array $searchTerms, string $indexTerms): int
    {
        $score = 0;

        foreach ($searchTerms as $searchTerm) {
            // extra points for whole word matches
            if (str_contains($indexTerms, "$searchTerm")) {
                $score += 10;
            } elseif (str_contains($indexTerms, "$searchTerm")) {
                $score += 1;
            } else {
                return 0;
            }

        }

        return $score;
    }
}