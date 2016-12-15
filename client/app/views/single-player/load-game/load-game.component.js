(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('loadGame', {
			templateUrl: 'views/single-player/load-game/load-game.html',
			controller: 'LoadGameController'
		});
})();