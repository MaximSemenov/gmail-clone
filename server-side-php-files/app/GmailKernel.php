<?php
declare (strict_type = 1);

namespace App;

use Framework\Http\AbstractKernel;

class GmailKernel extends AbstractKernel
{

    public function getConfigDir() : string
    {
        return __DIR__ . '/../config/';
    }
    public function getRoutesFile() : string
    {
        return __DIR__ . '/../routes.php';
    }

}