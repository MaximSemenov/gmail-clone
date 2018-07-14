<?php

declare(strict_types = 1);
namespace App\Http;

class Request
{
    public const METHOD_GET = 'GET';
    public const METHOD_POST = 'POST';

    private $uri;
    private $method;
    private $parameters = [];
    private $routeParameters = [];

    public function __construct(string $uri, string $method, array $parameters)
    {
        $this->uri = $uri;
        $this->method = $method;
        $this->parameters = $parameters;
        $this->routeParameters = [];
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

    public function getParameter(string $parameter)
    {
        return $this->parameters[$parameter];
    }

    public function getRouteParameters(): array
    {
        return $this->routeParameters;
    }
    
    public function setRouteParameters($parameters): void
    {
      $this->$routeParameters = $parameters;
    }
}
