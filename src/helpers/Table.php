<?php

namespace craftyfm\formbuilder\helpers;

abstract class Table
{
    public const FORMS = '{{%formbuilder_forms}}';
    public const SUBMISSIONS = '{{%formbuilder_submissions}}';
    public const SUBMISSION_STATUSES = '{{%formbuilder_statuses}}';
    public const EMAIL_NOTIF = '{{%formbuilder_email_notifications}}';
    public const INTEGRATIONS = '{{%formbuilder_integrations}}';
    public const INTEGRATION_OAUTH_TOKEN = '{{%formbuilder_integrations_tokens}}';
    public const FORM_INTEGRATION = '{{%formbuilder_form_integration}}';
}