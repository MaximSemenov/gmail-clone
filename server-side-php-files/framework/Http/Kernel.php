<?php
declare (strict_type = 1);

namespace Framework\Http;

use Framework\Http\Request;
use Framework\Http\Response;

interface Kernel
{
    public function process(Request $request) : ? Response;

    public function getConfigDir() : string;
    
    public function getRoutesFile() : string;
}
