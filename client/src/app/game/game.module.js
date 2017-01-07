
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
	.module('app.game', [

	])
	.config(function($stateProvider) {
		$stateProvider
			.state('game', {
				url: '/game',
				abstract: true,
				templateUrl: './game.html'
			})
			.state('game.play', {
				url: '/play',
				template: '<div game></div>',
				controller: 'GameController'
			});
	});