<?php
declare(strict_types = 1);

require 'vendor/autoload.php';

use App\AppKernel;
use Framework\Container\SimpleContainer;

use Framework\Http\Target;
use Framework\Http\Request;
use Framework\Http\Routing\Route;
use Framework\Http\Routing\Router;

$request = Request::createFromGlobals();
$kernel = new AppKernel(new SimpleContainer);
$response = $kernel->process($request);
$response->send();