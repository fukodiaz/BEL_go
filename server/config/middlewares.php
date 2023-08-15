<?php
use DI\Container;
use Slim\App;

require_once __DIR__ . '/../src/middlewares/CorsMiddleware.php';

return function (App $app) {

	$app -> add(new App\Middleware\CorsMiddleware());
	$app -> addBodyParsingMiddleware();
	$app->addRoutingMiddleware();
};