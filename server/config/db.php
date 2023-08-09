<?php 
	use Doctrine\DBAL\DriverManager as DriverManager;

	class DB {
		private $qb;
		private $conn;
		private $connectionParams;
		private $config;

		function __construct(Config $config) {
			$this -> config = $config;
			$this -> createConnection($this->config, 'users');
		}

		private function createConnection($config, $dbName) {
			$this -> connectionParams = $config -> getDbConfig($dbName);
			$this -> conn = DriverManager::getConnection($this -> connectionParams);

			$this -> qb = $this -> conn -> createQueryBuilder();
		}

		function getQueryBuilder($dbName) {
			$this -> createConnection($this->config, $dbName);
			return $this -> qb;
		}
	}