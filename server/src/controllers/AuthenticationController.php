<?php
namespace Slim\App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/User.php';

abstract class AuthenticationController extends BaseController {

	protected function getHash($password) {
		$hash = password_hash($password, PASSWORD_BCRYPT);
		return $hash;
	}

	protected function checkHash($password, $hash) {
		return password_verify($password, $hash);
	}

	//checking existence	of the user in db
	protected function userExists(string $login) {
		$userEntity = new \Slim\App\Entity\User($this -> container);
		return $userEntity -> getUser($login);
	}

	public function logOut(Request $req, Response $res, array $args = []): Response {
		$session = $req->getAttribute('session');
		$session['logged'] = false;
		unset($session['userData']);
		return $res -> withStatus(302) -> withHeader('Location', '/');
	}
}