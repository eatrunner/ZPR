(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('game', {
			templateUrl: 'views/game/game.html',
			controller: 'GameController'
		});
})();