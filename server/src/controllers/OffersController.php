<?php
namespace Slim\App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/Offer.php';
require_once __DIR__ . '/../../utils/convertBase64Image.php';

class OffersController extends BaseController {

	function getOffers(Request $req, Response $res): Response {
		$offerEntity = new \Slim\App\Entity\Offer($this -> container); 
		$offers = $offerEntity -> fetchAllOffers();
		//add src for images in item of offer
		$redefinePathToImg = function($item) {
			$item['imageIntro'] = convertBase64Image($item['imageIntro']);
			$item['imageDetails'] = convertBase64Image($item['imageDetails']);
			return $item;
		};
		$offers = array_map($redefinePathToImg, $offers);

		$res->getBody()->write(json_encode($offers));
		return $res-> withHeader('Content-Type', 'application/json');
	}
}