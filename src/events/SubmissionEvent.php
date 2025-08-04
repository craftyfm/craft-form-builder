<?php

namespace craftyfm\formbuilder\events;

use craftyfm\formbuilder\models\Submission;
use yii\base\Event;

class SubmissionEvent extends Event
{

    public Submission $submission;

}