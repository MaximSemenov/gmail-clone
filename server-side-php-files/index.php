<?php 
header("Access-Control-Allow-Origin: http://localhost:4200");


require './php/Mail.php';
require './php/http/routing/router.php';
require './php/http/routing/route.php';
require './php/http/routing/request.php';
require './php/Dependencies.php';
require './php/MailDataBase.php';

$router = new AppRouter();

//  echo $uri = $_SERVER['REQUEST_URI'];

$router->register(new Route('#mail/(?<method>getMail)#', Request::METHOD_GET, 'Mail'));
$router->register(new Route('#mail/(?<method>transferMail)#', Request::METHOD_GET, 'Mail'));
$router->register(new Route('#mail/(?<method>unreadMail)#', Request::METHOD_GET, 'Mail'));




$route = $router->resolve(Request::createFromGlobals());

$controller = $route->getTarget();
$instance = new $controller(new $dependencies[$controller]());
$method = $route->getAction();
$result = $instance->$method();

 echo $result;



// echo '<pre>';
// var_dump($route);
// var_dump($controller);
// var_dump($instance);
// var_dump(new Mail());

