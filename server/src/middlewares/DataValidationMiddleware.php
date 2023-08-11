<?php
namespace Slim\App\Middleware;

use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface as Middleware;
use JsonSchema\Validator as Validator;

class DataValidationMiddleware implements Middleware {
	private $jsonSchema;
	
	function __construct(string $jsonSchema) {
		$this -> $jsonSchema = $jsonSchema;
	}

	public function process(Request $req, RequestHandler $handler):Response {
		$jsonSchemaObject = json_decode($this -> jsonSchema);
		$contentType = $req -> getHeaderLine('Content-Type');

		if (strstr($contentType, 'application/json')) {
			$contents = json_decode(file_get_contents('php://input'), true);
			if (json_last_error() === JSON_ERROR_NONE) {
				$req = $req -> withParsedBody($contents);
			}
		}
		
		//check conformity data to schema
		$validator = new Validator();
		$data = $req -> getParsedBody();//array
		$dataObject = json_decode(json_encode($data));
		$validator -> validate($dataObject, $jsonSchemaObject);
	
		if ($validator -> isValid()) {
			$response = $handler-> handle($req);
			return $response;
		} else {
			$response = new Response();
			$response -> getBody() -> write(json_encode($validator -> getErrors()));
			$newResponse = $response -> withStatus(400); 
			return $newResponse -> withHeader('Content-Type', 'application/json');
		}
	}
}