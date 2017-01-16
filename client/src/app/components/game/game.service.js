function gameService($http, $q) {
	var service = {
		startGame: startGame,
		stopGame: stopGame,
		getGameInfo: getGameInfo,
		getMap: getMap,
		getTanks: getTanks,
		getBullets: getBullets,
		movePlayer: movePlayer,
		playerShoot: playerShoot
	};

	var API_GAME_PREFIX = '/tank-game/ajax/game';

	function makeGET(query, params) {
		return $q(function(resolve, reject) {
			$http.get(API_GAME_PREFIX + query, { params: params })
				.then(GETsuccess, reject);

			function GETsuccess(response) {
				resolve(response.data);
			}
		});
	}

	function startGame() {
		return makeGET('/startgame');
	}

	function stopGame() {
		return makeGET('/stopgame');
	}

	function getGameInfo() {
		return makeGET('/getgameinfo');
	}

	function getMap() {
		return makeGET('/getmap');
	}

	function getTanks() {
		return makeGET('/gettanks');
	}

	function getBullets() {
		return makeGET('/getBullets');
	}

	function movePlayer(playerId, direction) {
		return makeGET('/moveplayer', {
			id: playerId,
			dir: direction
		});
	}

	function playerShoot(playerId) {
		return makeGET('/playershoot', {
			id: playerId
		});
	}

	return service;
}

/*
 * @ngdoc type
 * @module app.game
 * @name gameService
 *
 * @description
 *
 * ## Lorem Ipsum 2
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 */
angular
  .module('app.components.game')
  .factory('gameService', gameService);
