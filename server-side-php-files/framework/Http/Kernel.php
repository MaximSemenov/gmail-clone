<?php
declare (strict_type = 1);

namespace Framework\Http;

use Framework\Http\Request;
use Framework\Http\Responce;

interface Kernel
{
    public function process(Request $request) : ? Responce;

    public function getConfigDir() : string;
    
    public function getRoutesFile() : string;
}
