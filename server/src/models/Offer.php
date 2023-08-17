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

	function fetchOffers($idCity=1) {
		$queryBuilder = $this -> container -> get('DB') -> getQueryBuilder('bel_go');
		$queryBuilder
			->select('o.id', 'c.label as city', 'o.imageIntro', 'o.imageDetails', 'o.price', 
						'o.rating', 'o.concept', 'o.descriptionShort', 'o.information', 
						'o.lat', 'o.lng')
			->from('offers', 'o')
			->where('o.city = ?')
			->innerJoin('o', 'cities', 'c', 'o.city = c.id')
			->setParameter(1, $idCity);

		$results = $queryBuilder -> executeQuery() -> fetchAll();
		return  $results;
	}
}