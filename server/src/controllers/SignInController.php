<?php
namespace Slim\App\Controller;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once __DIR__ . '/AuthenticationController.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../../utils/jeneral.php';

class SignInController extends AuthenticationController {
	public $container;

	function __construct(ContainerInterface $container) {
		session_start();
		$this -> container = $container;
		parent::__construct($this -> container);
	}

	function signIn(Request $req, Response $res, array $args = []):Response {
		if ($req -> getMethod() == 'POST') {
			$data = $req->getParsedBody();
			$login = clearString($data['login']);
			$pw = clearString($data['password']); 

			if (empty($login) || empty($pw)) {
				$result = 'Login or password is empty';
				return $this -> sendResponse($res, ['msg' => $result], 401);
			}
			
			//check existence of user in db
			if (empty($userData = $this -> userExists($login))) {
				$result = "User with this login doesn't exist";
				return $this -> sendResponse($res, ['msg' => $result], 401);
			}

			if (!$this->checkHash($pw, $userData['hash'])) {
				$result = "Invalid password";
				return $this -> sendResponse($res, ['msg' => $result], 401);
			}

			$session = $req -> getAttribute('session');
			$session['logged'] = true;
			$session['userData'] = [
				'id' => $userData['id'],
				'login' => $userData['login']
			];

			$result = "User was successfully logged in!";
			return $this -> sendResponse($res, ['msg' => $result], 200);
		}
	}

}