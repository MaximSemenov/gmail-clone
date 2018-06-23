<?php
namespace Container;
use Mail\Mail;

class Container
{
    private $bindings = [];

    public function bind(string $abstract, $concrete) : void
    {
        $this->$bindings[$abstract] = $concrete;
    }

    public function make(string $abstract)
    {
        if (isset($this->bindings[$abstract])) {
            return $this->bindings[$abstract];
        }

        return $this->resolve($abstract);
    }

    public function resolve(string $abstract)
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


    public function newInstanceIfNeed(string $concrete)
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
}

