<?php
use Symfony\Component\Dotenv\Dotenv;
use DI\Container;
use DI\ContainerBuilder;
use Slim\Factory\AppFactory;

//access to dependencies received via composer 
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = new Dotenv();
$dotenv -> load(__DIR__ . '/../.env');

// build container for DI
$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions(__DIR__ . '/../config/definitions.php');
$container = $containerBuilder->build();

//create instance of the application
AppFactory::setContainer($container);
$app = AppFactory::create();

//add middlewares
$middlewares = require_once __DIR__ . '/../config/middlewares.php';
$middlewares($app);

//add routes

$routes = require_once __DIR__ . '/../config/routes.php';
$routes($app);

// require_once __DIR__ . '/src/controllers/HomeController.php';
// $app -> get('/', App\Controller\HomeController::class . ':index');

$errorSettings = $container -> get('Config') -> getErrorSetting();
$errorMiddleware = $app -> addErrorMiddleware(
	$errorSettings['displayErrorDetails'],
	$errorSettings['logErrors'],
	$errorSettings['logErrorDetails']
);

$app->run();