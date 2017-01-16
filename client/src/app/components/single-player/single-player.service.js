function singlePlayerService($http, $q) {
	var service = {
		createGame: createGame
	};

	var API_GAME_PREFIX = '/tank-game/ajax/game';

	function createGame(gameOptions) {
		return $q(function(resolve, reject) {
			$http.get(API_GAME_PREFIX + '/creategame', {
				params: gameOptions
			}).then(createGameCallback, reject);

			function createGameCallback(response) {
				resolve(response.data);
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
