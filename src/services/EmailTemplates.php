<?php

namespace craftyfm\formbuilder\services;

use Craft;
use craft\base\Component;
use craft\base\MemoizableArray;
use craft\errors\BusyResourceException;
use craft\errors\StaleResourceException;
use craft\events\ConfigEvent;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\helpers\Table;
use craftyfm\formbuilder\records\EmailTemplateRecord;
use craftyfm\formbuilder\models\EmailTemplate as EmailTemplateModel;
use yii\base\ErrorException;
use yii\base\Exception;
use yii\base\InvalidConfigException;
use yii\base\NotSupportedException;
use yii\web\ServerErrorHttpException;

class EmailTemplates extends Component
{
    public const CONFIG_KEY = 'formBuilder.emailTemplates';

    public function init(): void
    {
        parent::init();

        $projectConfig = Craft::$app->getProjectConfig();
        $projectConfig->onAdd(self::CONFIG_KEY . '.{uid}', [$this, 'handleChangedTemplate']);
        $projectConfig->onUpdate(self::CONFIG_KEY . '.{uid}', [$this, 'handleChangedTemplate']);
        $projectConfig->onRemove(self::CONFIG_KEY . '.{uid}', [$this, 'handleDeletedTemplate']);
    }

    public function getAll(): array
    {
        $records = EmailTemplateRecord::find()->all();
        $emailTemplates = [];
        foreach ($records as $record) {
            $emailTemplates[] = new EmailTemplateModel($record->toArray());
        }
        return $emailTemplates;
    }

    public function getById(int $id): ?EmailTemplateModel
    {
        $record = EmailTemplateRecord::findOne(['id' => $id]);
        if (!$record) {
            return null;
        }
        return new EmailTemplateModel($record->toArray());
    }

    public function getByHandle(string $handle): ?EmailTemplateModel
    {
        $record = EmailTemplateRecord::findOne(['handle' => $handle]);
        if (!$record) {
            return null;
        }
        return new EmailTemplateModel($record->toArray());
    }

    public function getByUid(string $uid): ?EmailTemplateModel
    {
        $record = EmailTemplateRecord::findOne(['uid' => $uid]);
        if (!$record) {
            return null;
        }
        return new EmailTemplateModel($record->toArray());
    }

    /**
     * @throws NotSupportedException
     * @throws InvalidConfigException
     * @throws ServerErrorHttpException
     * @throws StaleResourceException
     * @throws BusyResourceException
     * @throws ErrorException
     * @throws Exception
     */
    public function saveTemplate(EmailTemplateModel $model, bool $runValidation = true): bool
    {
        if ($runValidation && !$model->validate()) {
            FormBuilder::log('Email Template not saved due to validation error.', 'info');
            return false;
        }

        $isNew = $model->id === null;

        if ($isNew) {
            $model->uid = StringHelper::UUID();
        } else {
            $model->uid = Db::uidById(Table::EMAIL_TEMPLATES, $model->id);
        }

        $configPath = self::CONFIG_KEY . '.' . $model->uid;
        Craft::$app->getProjectConfig()->set($configPath, $model->getConfig());

        if ($isNew) {
            $model->id = Db::idByUid(Table::EMAIL_TEMPLATES, $model->uid);
        }

        return true;
    }

    /**
     * @throws \yii\db\Exception
     */
    public function handleChangedTemplate(ConfigEvent $event): void
    {
        $uid = $event->tokenMatches[0];
        $data = $event->newValue;

        $record = EmailTemplateRecord::findOne(['uid' => $uid]);
        if (!$record) {
            $record = new EmailTemplateRecord();
        }
        $record->name = $data['name'];
        $record->handle = $data['handle'];
        $record->template = $data['template'];
        $record->uid = $uid;
        $record->save(false);
    }

    public function deleteTemplate(EmailTemplateModel $template): void
    {
        $uid = $template->uid;
        Craft::$app->getProjectConfig()->remove(self::CONFIG_KEY . '.' . $uid);
    }

    public function handleDeletedTemplate(ConfigEvent $event): void
    {
        $uid = $event->tokenMatches[0];
        EmailTemplateRecord::deleteAll(['uid' => $uid]);
    }
}