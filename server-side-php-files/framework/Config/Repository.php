<?php
declare(strict_types = 1);

namespace Framework\Config;

interface Repository
{
    public function get(string $key, $default = null);
}
