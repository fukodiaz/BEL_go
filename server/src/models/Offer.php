<?php
namespace Slim\App\Entity;

use Psr\Container\ContainerInterface;

class Offer {
	private $jsonSchema;
	public $container;

	function __construct(ContainerInterface $container) {
		$this -> container = $container;
		$this -> jsonSchema = <<<'JSON'
			{
				"type": "object",
				"properties": {
					"id": {"type": "integer"},
					"city": {"type": "string"},
					"imageIntro": {"type": "string"},
					"imageDetails": {"type": "string"},
					"price": {"type": "float"},
					"rating": {"type": "float"},
					"concept": {"type": "string"},
					"descriptionShort": {"type": "string"},
					"information": {"type": "string"},
					"lat": {"type": "float"},
					"lng": {"type": "float"}
				},
				"required": ["city", "price", "concept", "descriptionShort"]
			}
		JSON;
	}

	function getJsonSchema() {
		return $this -> jsonSchema;
	}

	function fetchAllOffers() {
		$queryBuilder = $this -> container -> get('DB') -> getQueryBuilder('bel_go');
		$queryBuilder
			->select('id', 'city', 'imageIntro', 'imageDetails', 'price', 'rating',
						'concept', 'descriptionShort', 'information', 'lat', 'lng')
			->from('offers');

		$results = $queryBuilder -> executeQuery() -> fetchAll();
		return  $results;
	}
}