<?php
namespace Slim\App\Entity;

use Psr\Container\ContainerInterface;

class City {
	private $jsonSchema;
	public $container;

	function __construct(ContainerInterface $container) {
		$this -> container = $container;
		$this -> jsonSchema = <<<'JSON'
			{
				"type": "object",
				"properties": {
					"id": {"type": "integer"},
					"label": {"type": "string"},
					"lat": {"type": "float"},
					"lng": {"type": "float"}
				},
				"required": ["label", "lat", "lng"]
			}
		JSON;
	}

	function getJsonSchema() {
		return $this -> jsonSchema;
	}

	function fetchDataCities() {
		$queryBuilder = $this -> container -> get('DB') -> getQueryBuilder('bel_go');
		$queryBuilder
			->select('id', 'label', 'lat', 'lng')
			->from('cities');

		$results = $queryBuilder -> executeQuery() -> fetchAll();
		return  $results;
	}
}