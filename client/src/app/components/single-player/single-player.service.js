function singlePlayerService($http, $q) {
	var service = {
		createGame: createGame,
		getAvailableMaps: getAvailableMaps
	};

	var API_GAME_PREFIX = '/tank-game/ajax/game';

	function createGame(mapId) {
		return $q(function(resolve, reject) {
			$http.get(API_GAME_PREFIX + '/creategame', {
				params: {
					map_id: mapId
				}
			}).then(createGameCallback, reject);

			function createGameCallback(response) {
				if(response.error)
					reject(response.error);
				else
					resolve(response.data.game_id);
			}
		});
	}

	function getAvailableMaps() {
		return $q(function(resolve, reject) {
			$http.get(API_GAME_PREFIX + '/getavalmaps')
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
  .module('app.components.single-player')
  .factory('singlePlayerService', singlePlayerService);
