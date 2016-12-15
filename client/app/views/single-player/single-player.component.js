(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('singlePlayer', {
			templateUrl: 'views/single-player/single-player.html',
			controller: 'SinglePlayerController'
		});
})();