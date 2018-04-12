<?php 

class Router
{

    protected static $routes = [
        '/mail' => ['controller' => 'Mail', 'action' => 'getMail'],
        '/mailTransfer' => ['controller' => 'Mail', 'action' => 'transferMail']
    ];
    protected static $requestedRoute = [];

    function __construct()
    {
        echo 'Hello World!';
    }

    public static function getAllRoutes()
    {
        return self::$routes;
    }

    public static function getRoute($route)
    {
        return self::$routes[$route];
    }




}