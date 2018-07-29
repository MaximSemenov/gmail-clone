<?php
declare(strict_types = 1);

namespace Framework\Http;

class JsonResponse extends PlainResponse
{
    public function __construct(string $content = '')
    {
        parent::__construct(json_encode($content));
    }

}
