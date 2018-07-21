<?php
declare (strict_types = 1);

namespace Framework\Container;

interface Container
{
    public function bind(string $abstract, $concrete) : void;

    public function make(string $abstract);

    public function call($instance, string $method);
}
