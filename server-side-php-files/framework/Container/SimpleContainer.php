<?php
declare (strict_types = 1);

namespace Framework\Container;

use Framework\Container\Container;

class SimpleContainer implements Container
{
    private $bindings = [];

    public function bind(string $abstract, $concrete) : void
    {
        $this->bindings[$abstract] = $concrete;
    }

    public function make(string $abstract)
    {
        if (isset($this->bindings[$abstract])) {
            return $this->newInstanceIfNeed($this->bindings[$abstract]);
        }

        return $this->resolve($abstract);
    }

    private function resolve(string $abstract)
    {
        $reflection = new \ReflectionClass($abstract);
        $constructor = $reflection->getConstructor();
        $resolved = [];
        if ($constructor !== null) {

            $parameters = $constructor->getParameters();
            foreach ($parameters as $parameter) {

                $resolved[] = $this->make($parameter->getType()->getName());
            }
        }

        return $reflection->newInstanceArgs($resolved);
    }

    private function newInstanceIfNeed($concrete)
    {
        if (is_callable($concrete)) {

            return $this->newInstanceIfNeed(($concrete($this)));
        }

        if (is_object($concrete)) {

            return $concrete;
        }


        if (is_string($concrete)) {

            return $this->make($concrete);
        }

        return null;
    }

    public function call($instance, string $method)
    {
        $reflection = new \ReflectionMethod($instance, $method);
        $resolved = [];
        foreach ($reflection->getParameters() as $parameter) {
            $resolved[] = $this->make($parameter->getType()->getName());
        }

        return $reflection->invokeArgs($instance, $resolved);
    }
}
