/**
* @ngdoc overview
* @name components.game
* @description
* # components.game
* This is the `components.game` module. 
*
* This is a route to the functions such as `new-game` and `play-game`
*/
angular
	.module('components.game', [
		'ui.select'
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('game', {
				url: '/game',
				template: '<div ui-view></div>'
			});
	});