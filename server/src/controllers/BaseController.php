<?php
namespace Slim\App\Controller;

use Psr\Container\ContainerInterface;

abstract class BaseController {
	protected $container;

	function __construct(ContainerInterface $container) {
		$this -> container = $container;
	}
}