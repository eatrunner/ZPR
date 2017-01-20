function gameService($http, $q) {
	var service = {
		startGame: startGame,
		stopGame: stopGame,
		getGameInfo: getGameInfo,
		getState: getState,
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

	function startGame(gameId) {
		return makeGET('/startgame', {game_id: gameId});
	}

	function stopGame(gameId) {
		return makeGET('/stopgame', {game_id: gameId});
	}

	function getGameInfo(gameId) {
		return makeGET('/getgameinfo', {game_id: gameId});
	}

	function getState(gameId) {
		return makeGET('/getstate', {game_id: gameId});
	}

	function movePlayer(gameId, playerId, direction) {
		return makeGET('/moveplayer', {
			game_id: gameId,
			id: playerId,
			dir: direction
		});
	}

	function playerShoot(gameId, playerId) {
		return makeGET('/playershoot', {
			game_id: gameId,
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
