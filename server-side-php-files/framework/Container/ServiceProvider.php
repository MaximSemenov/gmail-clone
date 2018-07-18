<?php
declare (strict_types = 1);

namespace Framework\Container;

interface ServiceProvider
{
    public function register(Container $container) : void;
}
