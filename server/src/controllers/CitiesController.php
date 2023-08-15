<?php
namespace Slim\App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/City.php';

class CitiesController extends BaseController {

	function getDataCities(Request $req, Response $res): Response {
		$cityEntity = new \Slim\App\Entity\City($this -> container); 
		$dataCities = $cityEntity -> fetchDataCities();

		$res->getBody()->write(json_encode($dataCities));
		return $res-> withHeader('Content-Type', 'application/json');
	}
}