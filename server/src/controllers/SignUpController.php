<?php
namespace Slim\App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once __DIR__ . '/AuthenticationController.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../../utils/jeneral.php';

class SignUpController extends AuthenticationController {

	function signUp(Request $req, Response $res):Response {
		if ($req -> getMethod() == 'POST') {
			$data = $req->getParsedBody();
			$login = clearString($data['login']);
			$pw = clearString($data['password']);

			if (empty($login) || empty($pw)) {
				$result = 'Login or password is empty';
				return $this -> sendResponse($res, ['msg' => $result], 401);
				//return $res -> withStatus(302) -> withHeader('Location', '/login');
			}

			//if user with this login doesn't exist - save him in db
			if (empty($userData = $this -> userExists($login))) {
				$hash = $this -> getHash($pw);
				if ((new \Slim\App\Entity\User($this -> container)) -> saveUser($login, $hash)) {
					$result = "User was successfully added!";
					return $this -> sendResponse($res, ['msg' => $result], 201);
				} else {
					$result = "The error occurred while adding data";
					return $this -> sendResponse($res, ['msg' => $result], 401);
				}
			} else {
				$result = 'This login exists already';
				return $this -> sendResponse($res, ['msg' => $result], 401);
			}
		}
	}
}