<?php
declare (strict_type = 1);

namespace Framework\Http;

use Framework\Container\Container;
use Framework\Container\ServiceProvider;
use Framework\Config\Repository;
use Framework\Http\Routing\Router;
use Framework\Http\Routing\Route;

abstract class AbstractKernel implements Kernel
{
    /**
     * @var Container
     */
    protected $container;
    private $defaultProviders = [];
    private $providers = [];

    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->container->bind(Container::class, $this);
        $this->container->bind(Kernel::class, $this);
        $this->registerDefaultProviders();
    }
    public function process(Request $request) : Response
    {
        $this->container->bind(Request::class, $request);
        $this->loadProviders();
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
            return $this->createNotFoundresponse();
        }
        $controller = $this->container->make($route->getTarget()->getControllerName());
        $response = $this->container->call($controller, $route->getTarget()->getMethodName());
        return $response;
    }

    public function loadProviders() : void
    {
        $config = $this->container->make(Repository::class);
        $this->providers = $config->get('app.providers');
    }

    public function registerDefaultProviders() : void
    {
        $this->register($this->defaultProviders);
    }

    private function registerProviders() : void
    {
            try {
                $this->register($this->providers);
            } catch (\Exception $e) {
                die($e->getMessage());
            }
    }

    private function register(array $providers)
    {
        foreach ($providers as $provider) {
            $instance = $this->container->make($provider);
            if (!($instance instanceof ServiceProvider)) {
                throw new \Exception("Service provider {$provider} must be an instance of Framework\Container\ServiceProvider");
            }
            /**
             * @var ServiceProvider
             */
            $instance->register($this->container);
        }
    }

    private function createNotFoundResponse() : Response
    {
        return new PlainResponse('Not Found', Response::STATUS_NOT_FOUND);
    }

}
