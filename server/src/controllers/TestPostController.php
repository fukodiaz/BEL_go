<?php
namespace Slim\App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;

class TestController {

	function test(Request $req, Response $res): Response {
		$data = $req->getParsedBody();
		$login = $data['login'];
		$pw = $data['password']; 
		
		$res->getBody()->write(json_encode($login));
		return $res -> withHeader('Content-Type', 'application/json')
						-> withHeader('Access-Control-Allow-Origin', '*');
	}
}