(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('highscores', {
			templateUrl: 'views/highscores/highscores.html',
			controller: 'HighscoresController'
		});
})();