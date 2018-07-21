<?php
declare(strict_types = 1);

namespace Framework\Http\Routing;

use Framework\Container\Container;
use Framework\Container\ServiceProvider;
use Framework\Http\Kernel;

class RouterServiceProvider implements ServiceProvider
{
    public function register(Container $container): void
    {
        $container->bind(Router::class, function (Container $container) {
            /** @var Kernel $kernel */
            $kernel = $container->make(Kernel::class);
            $file = $kernel->getRoutesFile();
            $router = new DefaultRouter();
            require $file;

            return $router;
        });
    }
}
