<?php
namespace Slim\App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class HomeController {
	function index(Request $req, Response $res): Response {
		
		$res->getBody()->write(json_encode('home-page'));
		return $res;
	}
}