<?php
namespace Slim\App\Middleware;

use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface as Middleware;

class CorsMiddleware implements Middleware {

	//invoke middleware
	public function process(Request $req, RequestHandler $handler): Response {
		$url = 'http://' . $_ENV['CLIENT_HOST'] . ':' . $_ENV['CLIENT_PORT'];
		//echo 'url-client: ' . $url;
		header("Access-Control-Allow-Origin: $url");
		header('Access-Control-Allow-Credentials: false');	
		header('Access-Control-Allow-Headers: Content-type, Authorization, Origin, Access-Control-Allow-Origin, Accept, Options, X-Requested-With');
		header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, PATCH, OPTIONS');

		return $handler -> handle($req);
	}
}