(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('multiPlayer', {
			templateUrl: 'views/multi-player/multi-player.html',
			controller: 'MultiPlayerController'
		});
})();