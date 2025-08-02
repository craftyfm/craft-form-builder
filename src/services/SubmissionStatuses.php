<?php

namespace craftyfm\formbuilder\services;


use Craft;
use craft\base\Component;
use craft\base\MemoizableArray;
use craft\db\Query;
use craft\errors\BusyResourceException;
use craft\errors\StaleResourceException;
use craft\events\ConfigEvent;
use craft\helpers\Db;
use craft\helpers\ProjectConfig as ProjectConfigHelper;
use craft\helpers\StringHelper;
use craftyfm\formbuilder\FormBuilder;
use craftyfm\formbuilder\helpers\Table;
use craftyfm\formbuilder\models\SubmissionStatus;
use craftyfm\formbuilder\records\SubmissionStatusRecord;
use Throwable;
use yii\base\ErrorException;
use yii\base\Exception;
use yii\base\InvalidConfigException;
use yii\base\NotSupportedException;
use yii\db\StaleObjectException;
use yii\web\ServerErrorHttpException;

class SubmissionStatuses extends Component
{
    public const CONFIG_KEY = 'formBuilder.statuses';

    private ?MemoizableArray $_statuses = null;

    public function init(): void
    {
        parent::init();

        $projectConfig = Craft::$app->getProjectConfig();
        $projectConfig->onAdd(self::CONFIG_KEY . '.{uid}', [$this, 'handleChangedStatus']);
        $projectConfig->onUpdate(self::CONFIG_KEY . '.{uid}', [$this, 'handleChangedStatus']);
        $projectConfig->onRemove(self::CONFIG_KEY . '.{uid}', [$this, 'handleDeletedStatus']);
    }

    public function getAll(): MemoizableArray
    {
        return $this->_statuses();
    }
    public function getById(int $id): ?SubmissionStatus
    {
        return $this->_statuses()->firstWhere('id', $id);
    }

    public function getByHandle(string $handle): ?SubmissionStatus
    {
        return $this->_statuses()->firstWhere('handle', $handle, true);
    }

    public function getByUid(string $uid): ?SubmissionStatus
    {
        return $this->_statuses()->firstWhere('uid', $uid, true);
    }

    public function getDefault(): ?SubmissionStatus
    {
        return $this->_statuses()->firstWhere('isDefault', true);
    }

    /**
     * @throws NotSupportedException
     * @throws InvalidConfigException
     * @throws ServerErrorHttpException
     * @throws StaleResourceException
     * @throws BusyResourceException
     * @throws ErrorException
     * @throws Exception
     * @throws \Exception
     */
    public function saveStatus(SubmissionStatus $status, bool $runValidation = true): bool
    {
        $isNewStatus = !$status->id;

        if ($runValidation && !$status->validate()) {
            FormBuilder::log('Status not saved due to validation error.', 'info');
            return false;
        }

        if ($isNewStatus) {
            $status->uid = StringHelper::UUID();
        } else if (!$status->uid) {
            $status->uid = Db::uidById(Table::SUBMISSION_STATUSES, $status->id);
        }

        // Make sure no statuses that are not archived share the handle
        $existingStatus = $this->getByHandle($status->handle);
        if ($existingStatus && (!$status->id || $status->id != $existingStatus->id)) {
            $status->addError('handle', Craft::t('form-builder', 'That handle is already in use'));
            return false;
        }

        $configPath = self::CONFIG_KEY . '.' . $status->uid;
        Craft::$app->getProjectConfig()->set($configPath, $status->getConfig(), "Save the “{$status->handle}” status");

        if ($isNewStatus) {
            $status->id = Db::idByUid(Table::SUBMISSION_STATUSES, $status->uid);
        }

        return true;
    }


    /**
     * @throws Throwable
     * @throws \yii\db\Exception
     */
    public function handleChangedStatus(ConfigEvent $event): void
    {
        $statusUid = $event->tokenMatches[0];
        $data = $event->newValue;

        $transaction = Craft::$app->getDb()->beginTransaction();
        try {
            $record = SubmissionStatusRecord::findOne(['uid' => $statusUid]);

            if (!$record) {
                $record = new SubmissionStatusRecord();
            }
            $record->name = $data['name'];
            $record->handle = $data['handle'];
            $record->color = $data['color'];
            $record->description = $data['description'] ?? null;
            $record->isDefault = $data['isDefault'] ?? false;
            $record->uid = $statusUid;

            $record->save(false);

            $transaction->commit();
        } catch (\yii\db\Exception | Throwable $e) {
            $transaction->rollBack();
            throw $e;
        }
        // Clear caches
        $this->_statuses = null;
    }

    public function deleteStatus(SubmissionStatus $status): void
    {
        $uid = $status->uid;
        Craft::$app->projectConfig->remove(self::CONFIG_KEY . '.' . $uid);
    }

    /**
     * @throws StaleObjectException
     * @throws Throwable
     */
    public function handleDeletedStatus(ConfigEvent $event): void
    {
        $uid = $event->tokenMatches[0];

        $record = SubmissionStatusRecord::findOne(['uid' => $uid]);
        $record?->delete();
    }


    private function _statuses(): MemoizableArray
    {
        if (!isset($this->_statuses)) {
            $statuses = [];

            foreach ($this->_createStatusesQuery()->all() as $result) {
                $statuses[] = new SubmissionStatus($result);
            }

            $this->_statuses = new MemoizableArray($statuses);
        }

        return $this->_statuses;
    }

    private function _createStatusesQuery(): Query
    {
        return (new Query())
            ->select([
                'id',
                'name',
                'handle',
                'color',
                'description',
                'isDefault',
                'uid',
            ])
            ->from([Table::SUBMISSION_STATUSES]);
    }

}
