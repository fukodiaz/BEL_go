<?php
use Slim\App;

require_once __DIR__ . '/../src/controllers/HomeController.php';
require_once __DIR__ . '/../src/controllers/SignUpController.php';
require_once __DIR__ . '/../src/controllers/SignInController.php';
require_once __DIR__ . '/../src/controllers/OffersController.php';
require_once __DIR__ . '/../src/controllers/CitiesController.php';

require_once __DIR__ . '/../src/controllers/TestPostController.php';

return function (App $app) {
	$app -> get('/', App\Controller\HomeController::class . ':index');
	$app -> post('/signup', App\Controller\SignUpController::class . ':signUp');
	$app -> post('/login', App\Controller\SignInController::class . ':signIn');
	$app -> get('/offers', App\Controller\OffersController::class . ':getOffers');
	$app -> get('/dataCities', App\Controller\CitiesController::class . ':getDataCities');

	$app -> post('/test', App\Controller\TestController::class . ':test');

	//for cors
	$app->options('/{routes:.+}', function ($request, $response, $args) {
		return $response;
	});
};