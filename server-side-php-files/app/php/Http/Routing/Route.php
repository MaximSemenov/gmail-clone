<?php

namespace Http;

class Route
{

    private $uri;
    private $method;
    private $target;
    private $action;

    public function __construct(string $uri, string $method, string $target)
    {
        $this->uri = $uri;
        $this->method = $method;
        $this->target = $target;
    }

    public function getUri() : string
    {
        return $this->uri;
    }
    public function getMethod() : string
    {
        return $this->method;
    }
    public function getTarget() : string
    {
        return $this->target;
    }
    public function setAction($action) : void
    {
        $this->action = $action;
    }

    public function getAction() : string
    {
        return $this->action["method"];
    }

}