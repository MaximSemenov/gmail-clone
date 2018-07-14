<?php

declare(strict_types = 1);
namespace App\Http\Routing;
use App\Http\Request;

class Router
{
    private $routes = [];

    public function resolve(Request $request)
    {
        $resolved = null;

        foreach ($this->routes as $route) {

            if ($route->getMethod() === $request->getMethod()) {
                $matches = [];

                if (preg_match($route->getUri(), $request->getUri(), $matches)) {
                    $request->setRouteParameters($matches);
                    $route->setAction($route->getControllerMethodName());
                    $resolved = $route;
                    break;
                }
            }
        }
        return $resolved;
    }

    public function register(Route $route) : void
    {
        $this->routes[] = $route;
    }
}
