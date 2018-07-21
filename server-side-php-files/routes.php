<?php

use Framework\Http\Request;
use Framework\Http\Routing\Route;
use Framework\Http\Routing\Router;
use Framework\Http\Routing\Target;

/** @var Router $router */
$router->register(new Route('#mail/(?<method>getMail)#', Request::METHOD_GET, new Target(App\Controllers\MailController::class, 'getMail')));
$router->register(new Route('#mail/(?<method>transferMail)#', Request::METHOD_GET, new Target(App\Controllers\MailController::class, 'transferMail')));
$router->register(new Route('#mail/(?<method>unreadMail)#', Request::METHOD_GET, new Target(App\Controllers\MailController::class, 'unreadMail')));
$router->register(new Route('#^/index$#', Request::METHOD_GET, new Target(App\Controllers\IndexController::class, 'index')));
