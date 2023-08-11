<?php
use Slim\App;

require_once __DIR__ . '/../src/controllers/HomeController.php';
require_once __DIR__ . '/../src/controllers/SignUpController.php';
require_once __DIR__ . '/../src/controllers/SignInController.php';
require_once __DIR__ . '/../src/controllers/OffersController.php';

return function (App $app) {
	$app -> get('/', App\Controller\HomeController::class . ':index');
	$app -> post('/signup', App\Controller\SignUpController::class . ':signUp');
	$app -> post('/login', App\Controller\SignInController::class . ':signIn');
	$app -> get('/offers', App\Controller\OffersController::class . ':getOffers');
};