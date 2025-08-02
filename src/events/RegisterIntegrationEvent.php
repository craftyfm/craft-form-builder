<?php

namespace craftyfm\formbuilder\events;

use craft\base\Event;

class RegisterIntegrationEvent extends Event
{
    public array $types = [];
}