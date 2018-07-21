<?php
declare(strict_types = 1);

namespace Framework\Config;

use Framework\Container\Container;
use Framework\Container\ServiceProvider;
use Framework\Http\Kernel;

class ConfigServiceProvider implements ServiceProvider
{
    public function register(Container $container): void
    {
        $container->bind(Repository::class, function (Container $container) {
            /** @var Kernel $kernel */
            $kernel = $container->make(Kernel::class);

            return new FileRepository($kernel->getConfigDir());
        });
    }
}
