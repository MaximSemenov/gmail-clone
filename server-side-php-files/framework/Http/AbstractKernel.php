<?php
declare (strict_type = 1);

namespace Framework\Http;

use Framework\Http\Kernel;
use Framework\Http\PlainResponse;
use Framework\Container\Container;
use Framework\Container\ServiceProvider;

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
        $this->registerDefaultProviders();
    }
    public function process(Request $request) : ? Responce
    {
        $this->container->bind(Request::class, $request);
        $this->registerProviders();
        /**
         * @var Router
         */
        $router = $this->container->make(Router::class);
        /**
         * @var Route
         */
        $route = $router->resolve($request);
        if ($route === null) {
            return $this->createNotFoundResponce();
        }
        $controller = $this->container->make($route->getTarget()->getControllerName());
        $response = $this->container->call($controller, $route->getTarget()->getMethodName());
        return $response;
    }

    public function LoadProviders() : void
    {

    }

    public function registerDefaultProviders() : void
    {
        $this->register($this->defaultProviders);
    }

    private function registerProviders(array $providers) : void
    {
        $this->register($this->providers);
    }

    private function register(array $providers)
    {
        foreach ($providers as $provider) {
            $instance = $this->container->make($provider);
            if (!($instance instanceof ServiceProvider)) {
                throw new \Exception("Service provider {$provider} must be an instance of Framework\Container\ServiceProvider");
            }
            $instance = register($this->container);
        }
    }

    private function createNotFoundResponce() : Response
    {
        return new PlainResponse('Not Found', Responce::STATUS_NOT_FOUND);
    }

}
