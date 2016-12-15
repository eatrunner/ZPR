(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('newGame', {
			templateUrl: 'views/single-player/new-game/new-game.html',
			controller: 'NewGameController'
		});
})();