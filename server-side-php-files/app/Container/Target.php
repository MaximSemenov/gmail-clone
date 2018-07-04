<?php

namespace App\Container;

class Target
{

    private $controllerName;
    private $method;

    function __construct(string $controllerName, string $method)
    {
        $this->controllerName = $controlleName;
        $this->$method = $method;
    }

    public function getControlleName()
    {
        return $this->controllerName;
    }

    public function getMethod()
    {
        return $this->method;
    }


}