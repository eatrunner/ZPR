function gameService($http, $q, gameSession) {
	var service = {
		startGame: startGame,
		stopGame: stopGame,
		getGameInfo: getGameInfo,
		getState: getState,
		movePlayer: movePlayer,
		resumeGame: resumeGame,
		pauseGame: pauseGame,
		playerShoot: playerShoot
	};

	var API_GAME_PREFIX = '/tank-game/ajax/game';

	function makeGET(query, params) {
		return $q(function(resolve, reject) {
			if(angular.isUndefined(params)) 
				params = {};
			params.game_id = gameSession.gameId;
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

	function pauseGame() {
		return makeGET('/pausegame');
	}

	function resumeGame() {
		return makeGET('/resumegame');
	}

	function getGameInfo() {
		return makeGET('/getgameinfo');
	}

	function getState() {
		return makeGET('/getstate');
	}

	function movePlayer(direction) {
		return makeGET('/moveplayer', {
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
