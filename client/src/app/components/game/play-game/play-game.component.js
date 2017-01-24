
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
var playGame = {
	templateUrl: './play-game.html',
	controller: 'PlayGameController'
};

angular
	.module('app.components.game')
	.config(function($stateProvider) {
		$stateProvider
			.state('playGame', {
				url: '/playGame',
				template: '<div game-canvas></div>'
				// component: 'playGame'
			});
	});
