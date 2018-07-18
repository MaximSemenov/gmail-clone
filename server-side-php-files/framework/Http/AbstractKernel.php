<?php
declare (strict_type = 1);

namespace Framework\Http;

use Framework\Container\Container;
use Framework\Http\Kernel;

abstract class AbstractKernel implements Kernel
{
    /**
     * @var Container
     */
    protected $container;
    private $defaultProviders = [];
    private $provides = [];

    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->container->bind(Container::class, $this);
        $this->container->bind(Kernel::class, $this);
    }
    public function process(Request $request) : ? Responce
    {

    }

}
