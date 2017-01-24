/**
    * @ngdoc directive
    * @name components.game.directive:playGame
    * @restrict 'E'
    * @element ANY 
    * @description 
    * `<play-game>` is a component, which holds `gameCanvas` directive.
    */
var playGame = {
	templateUrl: './play-game.html',
};

angular
	.module('components.game')
	.component('playGame', playGame)
	.config(function($stateProvider) {
		$stateProvider
			.state('playGame', {
				url: '/playGame',
				template: '<div style="height: 100%" game-canvas></div>',
			});
	})
	.run(function($rootScope, $location, $state, GameService) {
		$rootScope.$on( '$stateChangeStart', function(e,toState,toParam,fromState, fromParams) {
		    console.log(toState);
		    if(toState.name === "playGame") {
		    	console.log(GameService.isGameCreated());
		    }
		});
});
