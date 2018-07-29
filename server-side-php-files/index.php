<?php
declare(strict_types = 1);

require 'vendor/autoload.php';

use App\GmailKernel;
use Framework\Container\SimpleContainer;
use Framework\Http\Request;
use Framework\Http\Response;

$request = Request::createFromGlobals();
$kernel = new GmailKernel(new SimpleContainer);
/** @var Response $response */
$response = $kernel->process($request);
$response->send();