<?php
declare(strict_types = 1);

namespace App\Http;

class Request
{
    public const METHOD_GET = 'GET';
    public const METHOD_POST = 'POST';

    private $uri;
    private $method;
    private $parameters;

    public function __construct(string $uri, string $method, array $parameters)
    {
        $this->uri = $uri;
        $this->method = $method;
        $this->parameters = $parameters;

    }

    public static function createFromGlobals(): Request
    {
        $uri = $_SERVER['REQUEST_URI'];
        $method = $_SERVER['REQUEST_METHOD'];

        return new Request($uri, $method, $_REQUEST);
    }

    public function getUri(): string
    {
        return $this->uri;
    }

    public function getMethod(): string
    {
        return $this->method;
    }

    public function getParameters(): array
    {
        return $this->parameters;
    }

    public function getParameter(string $parameter): array
    {
        return $this->parameters[$parameter];
    }
}
