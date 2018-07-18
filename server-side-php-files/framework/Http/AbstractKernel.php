<?php
declare (strict_type = 1);

namespace Framework\Http;

abstract class AbstractKernel implements Kernel
{
    public function process(Request $request) : ? Responce
    {

    }

}
