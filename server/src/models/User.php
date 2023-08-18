<?php
namespace Slim\App\Entity;

use Psr\Container\ContainerInterface;

class User {
	private $jsonSchema;
	public $container;
	private $queryBuilder;

	function __construct(ContainerInterface $container) {
		$this -> container = $container;
		$this -> queryBuilder = $this -> container-> get('DB') 
																-> getQueryBuilder($_ENV['DB_NAME_BELGO']);
		$this -> jsonSchema = <<<'JSON'
			{
				"type": "object",
				"properties": {
					"id": {"type": "integer"},
					"login": {"type": "string"},
					"hash": {"type": "string"},
				},
				"required": ["login", "hash"]
			}
		JSON;
	}

	function getJsonSchema() {
		return $this -> jsonSchema;
	}

	function getUser($login) {
		$this -> queryBuilder
			->select('id', 'login', 'hash')
			->from('users')
			->where('login = ?')
			->setParameter(1, $login);

		$results = $this -> queryBuilder -> executeQuery() -> fetchAssociative();
		return  $results;
	}

	function saveUser($login, $hash) {
		$this -> queryBuilder
			->insert('users')
			->setValue('login', '?')
			->setValue('hash', '?')
			->setParameter(1, $login)
			->setParameter(2, $hash);
		$result = $this -> queryBuilder -> executeStatement();
		return $result;
	} 
}