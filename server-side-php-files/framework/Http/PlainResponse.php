<?php
declare (strict_type = 1);

namespace Framework\Http;

use Framework\Http\Response;


class PlainResponse implements Response
{
    public function __construct(string $content = '', int $status = Response::STATUS_OK, array $headers = [])
    {

    }

    public function send() : void
    {

    }
}
