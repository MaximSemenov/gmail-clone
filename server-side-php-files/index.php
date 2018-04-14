<?php 
header("Access-Control-Allow-Origin: http://localhost:4200");

require './Router.class.php';
require './Mail.class.php';

$uri = (strtok($_SERVER["REQUEST_URI"], '?'));


$route = Router::getRoute($uri);
$controller = ($route['controller']);
$action = ($route['action']);

$instance = new $controller(new MailDataBase());
echo $instance->$action();

