(function() {
	'use strict';

	angular
		.module('tankGame')
		.factory('gameService', gameService);

	function gameService($http) {
		var service = {
			startGame: startGame,
			stopGame: stopGame,
			getTanks: getTanks,
			getBullets: getBullets,
			movePlayer: movePlayer,
		};

		function startGame() {

		}

		function stopGame() {
			
		}

		function getTanks() {
			
		}

		function getBullets() {
			
		}

		function movePlayer() {
			
		}

		return service;
	}
})();