<?php
namespace Slim\App\Middleware;

use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface as Middleware;

class CorsMiddleware implements Middleware {

	//invoke middleware
	public function process(Request $req, RequestHandler $handler): Response {
		$port =  !empty($_ENV['CLIENT_PORT']) ? ':' . $_ENV['CLIENT_PORT'] : ''; 
		$url = $_ENV['CLIENT_PROTOCOL'] . '://' . $_ENV['CLIENT_HOST'] . $port;
		//echo 'url-client: ' . $url;
		header("Access-Control-Allow-Origin: $url");
		header('Access-Control-Allow-Credentials: false');	
		header('Access-Control-Allow-Headers: Content-type, Authorization, Origin, Access-Control-Allow-Origin, Accept, Options, X-Requested-With');
		header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, PATCH, OPTIONS');

		return $handler -> handle($req);
	}
}