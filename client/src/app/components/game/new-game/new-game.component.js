/**
    * @ngdoc directive
    * @name components.game.directive:newGame
    * @restrict 'E'
    * @element ANY 
    * @param {Array<number>} availableMaps Array with numbers that contain `map_id`'s of maps. Can be obtained via {@link components.game.service:GameService GameService} 
    * @description 
    * `<new-game>` is a component, in which we can create a new game to play it.
    */
var newGame = {
	templateUrl: './new-game.html',
	controller: 'NewGameController',
	bindings: {
		availableMaps: '<'
	}
};

angular
	.module('components.game')
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

