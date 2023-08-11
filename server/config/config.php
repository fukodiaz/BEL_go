<?php

	class Config {
		private $dbSettings;
		private $errorSettings;
		private $dbName;

		function __construct() {
			$this -> dbSettings = array_merge(
				['dbname' => $_ENV['DB_NAME_BELGO']],
				$this -> getCommonDbSettings() 
			);

			//in prod version swith config err-veriables to false
			$this -> errorSettings = [
				'displayErrorDetails' => $_ENV['DISPLAY_ERR_DETAILS'],
				'logErrors' => $_ENV['LOG_ERRS'],
				'logErrorDetails' => $_ENV['LOG_ERR_DETAILS']
			];
		}

		private function getCommonDbSettings() {
			return [
				'user' => $_ENV['DB_USER'],
				'password' => $_ENV['DB_PASSWORD'],
				'host' => $_ENV['DB_HOST'],
				'driver' => $_ENV['DB_DRIVER']
			];
		}

		public function getDbConfig($dbName) {
			$this -> setDBName($dbName);
			return $this -> dbSettings;
		}

		private function setDBName($dbName) {
			switch ($dbName) {//DB_NAME_BELGO
				case 'bel_go':
					$this -> dbName = $_ENV['DB_NAME_BELGO'];
					break;
				case 'users':
					$this -> dbName = $_ENV['DB_NAME_USERS'];
					break;
				case 'offers':
					$this -> dbName = $_ENV['DB_NAME_OFFERS'];
					break;
				default:
					$this -> dbName = 'bel_go';
			}
			$this -> dbSettings['dbname'] = $this -> dbName;
		}

		public function getErrorSetting() {
			return $this -> errorSettings;
		}
	}