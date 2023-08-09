<?php
use Slim\App;

require_once __DIR__ . '/../src/controllers/HomeController.php';
require_once __DIR__ . '/../src/controllers/OffersController.php';

return function (App $app) {
	$app -> get('/', App\Controller\HomeController::class . ':index');
	$app -> get('/offers', App\Controller\OffersController::class . ':getOffers');
};