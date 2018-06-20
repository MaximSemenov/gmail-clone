<?php 
header("Access-Control-Allow-Origin: http://localhost:4200");


require './php/Mail.php';
require './php/http/routing/router.php';
require './php/http/routing/route.php';
require './php/http/routing/request.php';
require './php/Dependencies.php';
require './php/MailDataBase.php';
require './php/Container/Container.php';

$router = new AppRouter();


$router->register(new Route('#mail/(?<method>getMail)#', Request::METHOD_GET, 'Mail'));
$router->register(new Route('#mail/(?<method>transferMail)#', Request::METHOD_GET, 'Mail'));
$router->register(new Route('#mail/(?<method>unreadMail)#', Request::METHOD_GET, 'Mail'));

$route = $router->resolve(Request::createFromGlobals());
$controller = $route->getTarget();
$container = new Container();
$instance = $container->make($controller);
$method = $route->getAction();
$result = $instance->$method();

echo $result;



