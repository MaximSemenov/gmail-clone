<?php 
header("Access-Control-Allow-Origin: http://localhost:4200");

require './php/http/routing/router.php';
require './php/http/routing/route.php';
require './php/http/routing/request.php';

$router = new AppRouter();

 echo $uri = $_SERVER['REQUEST_URI'];

$router->register(new Route('/mail\/(getMail)/', Request::METHOD_GET, 'Mail'));
$router->register(new Route('/mail\/(transferMail)/', Request::METHOD_GET, 'Mail'));
$router->register(new Route('/mail\/(unreadMail)/', Request::METHOD_GET, 'Mail'));


$route = $router->resolve(Request::createFromGlobals());

echo '<pre>';
var_dump( $route);

