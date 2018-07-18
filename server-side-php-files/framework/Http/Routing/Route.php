<?php

declare(strict_types = 1);
namespace Framework\Http\Routing;
use Framework\Http\Target;

class Route
{
    private $uri;
    private $method;
    private $target;
    private $action;

    public function __construct(string $uri, string $method, Target $target)
    {
        $this->uri = $uri;
        $this->method = $method;
        $this->target = $target;
    }

    public function getUri(): string
    {
        return $this->uri;
    }

    public function getMethod(): string
    {
        return $this->method;
    }

    public function getControllerName(): string
    {
        return $this->target->getControllerName();
    }

    public function getControllerMethodName(): string
    {
        return $this->target->getMethodName();
    }

    public function setAction(string $action): void
    {
        $this->action = $action;
    }

    public function getAction() : string
    {
        // return $this->action["method"];
        return $this->action; 
    }
}
