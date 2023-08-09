<?php
namespace Slim\App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class OffersController {
	function getOffers(Request $req, Response $res): Response {
		$res->getBody()->write(json_encode('offers'));
		return $res;
	}
}