<?php
declare(strict_types = 1);
require 'vendor/autoload.php';

use App\Http\Routing\Router;
use App\Http\Routing\Route;
use App\Http\Request;
use App\Container\Container;
use App\Container\Target;

header("Access-Control-Allow-Origin: http://localhost:4200");

$router = new Router();

$router->register(new Route('#mail/(?<method>getMail)#', Request::METHOD_GET, new Target(App\Mail::class, 'getMail')));
$router->register(new Route('#mail/(?<method>transferMail)#', Request::METHOD_GET, new Target(App\Mail::class, 'transferMail')));
$router->register(new Route('#mail/(?<method>unreadMail)#', Request::METHOD_GET, new Target(App\Mail::class, 'unreadMail')));

$request = Request::createFromGlobals();
$route = $router->resolve($request);
$controller = $route->getControllerName();
$container = new Container();
$container->bind(Request::class, $request);
$instance = $container->make($controller);
$result = $container->call($instance, $route->getAction());

echo $result;
