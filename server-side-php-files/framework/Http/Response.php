<?php
declare (strict_type = 1);

namespace Framework\Http;

interface Response
{
    public const STATUS_OK = 200;
    public const STATUS_FORBIDDEN = 403;
    public const STATUS_NOT_FOUND = 404;
    public const STATUS_INTERNAL_ERROR = 500;

    public function send() : void;
}
