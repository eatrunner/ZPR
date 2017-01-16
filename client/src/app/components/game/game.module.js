
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

angular
	.module('app.components.game', [
		'app.components.game.states',
		'app.components.game.entities'
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('game', {
				url: '/game/:gameId',
				template: '<div game game-id="gameId" style="height: 100%"></div>',
				controller: 'GameController'
			});
	});