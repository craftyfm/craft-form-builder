<?php

namespace craftyfm\formbuilder\models;

class IntegrationResult
{
    public bool $success = false;
    public string $message = '';
    public array $data = [];
    public ?\Throwable $exception = null;

    public function __construct(bool $success = false, string $message = '', array $data = [], ?\Throwable $exception = null)
    {
        $this->success = $success;
        $this->message = $message;
        $this->data = $data;
        $this->exception = $exception;
    }

    public static function success(string $message = 'Integration executed successfully', array $data = []): self
    {
        return new self(true, $message, $data);
    }

    public static function error(string $message, ?\Throwable $exception = null, array $data = []): self
    {
        return new self(false, $message, $data, $exception);
    }
}