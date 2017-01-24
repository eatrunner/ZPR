function GameService($http, $q) {
	var service = {
		createGame: createGame,
		getAvailableMaps: getAvailableMaps,
		getGameInfo: getGameInfo,
		
		startGame: startGame,
		stopGame: stopGame,
		getState: getState,
		movePlayer: movePlayer,
		resumeGame: resumeGame,
		pauseGame: pauseGame,
		playerShoot: playerShoot,
	};

	var API_GAME_PREFIX = '/tank-game/ajax/game';
	var gameId;

	function createGame(mapId) {
		return $q(function(resolve, reject) {
			$http.get(API_GAME_PREFIX + '/creategame/', {
				params: {
					map_id: mapId
				}
			}).then(createGameCallback, reject);

			function createGameCallback(response) {
				if(response.error)
					reject(response.error);
				else {
					gameId = (response.data.game_id);
					resolve();
				}
			}
		});
	}

	function getAvailableMaps() {
		return $q(function(resolve, reject) {
			$http.get(API_GAME_PREFIX + '/getavalmaps/')
				.then(getAvailableMapsCallback, reject);

			function getAvailableMapsCallback(response) {
				if(response.error)
					reject(response.error);
				else {
					console.log(response.data.maps);
					resolve(response.data.maps);
				}
			}
		});
	}

	function makeGET(query, params) {
		return $q(function(resolve, reject) {
			if(angular.isUndefined(params)) 
				params = {};
			params.game_id = gameId;
			$http.get(API_GAME_PREFIX + query, { params: params })
				.then(GETsuccess, reject);

			function GETsuccess(response) {
				resolve(response.data);
			}
		});
	}

	function startGame() {
		return makeGET('/startgame/');
	}

	function stopGame() {
		return makeGET('/stopgame/');
	}

	function pauseGame() {
		return makeGET('/pausegame/');
	}

	function resumeGame() {
		return makeGET('/resumegame/');
	}

	function getGameInfo() {
		return makeGET('/getgameinfo');
	}

	function getState() {
		return makeGET('/getstate/');
	}

	function movePlayer(direction) {
		return makeGET('/moveplayer/', {
			dir: direction
		});
	}

	function playerShoot() {
		return makeGET('/playershoot/');
	}

	return service;
}

/*
 * @ngdoc type
 * @module app.game
 * @name GameService
 *
 * @description
 *
 * ## Lorem Ipsum 2
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 */
angular
  .module('app.components.game')
  .factory('GameService', GameService);
