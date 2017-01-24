/**
 *
 * @ngdoc module
 * @name components
 *
 * @requires components.contact
 * @requires components.auth
 *
 * @description
 *
 * This is the components module. It includes all of our components.
 *
 **/

var newGame = {
	templateUrl: './new-game.html',
	controller: 'NewGameController',
	bindings: {
		availableMaps: '<'
	}
};

angular
	.module('app.components.game')
	.component('newGame', newGame)
	.config(function($stateProvider) {
		$stateProvider
			.state('newGame', {
				url: '/newGame',
				component: 'newGame',
				resolve: {
					availableMaps: function(GameService) {
						return GameService.getAvailableMaps();
					}
				}
			});
	});

