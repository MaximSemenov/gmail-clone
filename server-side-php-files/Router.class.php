<?php 

class Router
{

    protected static $routes = [
        '/mail' => ['controller' => 'Mail', 'action' => 'getMail'],
        '/mailTransfer' => ['controller' => 'Mail', 'action' => 'transferMail'],
        '/mailUnread' => ['controller' => 'Mail', 'action' => 'getUnreadMail']
    ];
    protected static $requestedRoute = [];

    function __construct()
    {
        
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