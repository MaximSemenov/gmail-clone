<?php

namespace Framework\Container;

class Target
{

    private $controllerName;
    private $method;

    function __construct(string $controllerName, string $method)
    {
        $this->controllerName = $controllerName;
        $this->method = $method;
    }

    public function getControllerName() : string
    {
        return $this->controllerName;
    }

    public function getMethodName() : string
    {
        return $this->method;
    }


}