<?php
declare (strict_type = 1);

namespace Framework\Http\Routing;

use Framework\Http\Request;

interface Router
{
    public function resolve(Request $request) : ? Route;
    public function register(Route $route) : void;
}
