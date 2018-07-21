<?php
declare(strict_types = 1);

namespace Framework\Config;

class FileRepository implements Repository
{
    /**
     * @var string
     */
    private $path;

    public function __construct(string $path)
    {
        $this->path = $path;
    }

    public function get(string $key, $default = null)
    {
        return [];
    }
}
