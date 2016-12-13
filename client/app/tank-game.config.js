(function() {
	'use strict';

	angular
		.module('tankGame')
		.config(tankGameConfig);

	function tankGameConfig($routeProvider, $translateProvider) {
		$routeProvider
			.when('/start', {
				template: '<start></start>'
			})
			.when('/settings', {
				template: '<settings></settings>'
			})
			.when('/highscores', {
				template: '<highscores></highscores>'
			})
			.when('/multi-player', {
				template: '<multi-player></multi-player>'
			})
			.when('/single-player', {
				template: '<single-player></single-player>'
			})
			.when('/game', {
				template: '<game></game>'
			})
			.otherwise({
				redirectTo: '/start'
			});

		$translateProvider.useStaticFilesLoader({
			prefix: 'translations/',
			suffix: '.json'
		});

		$translateProvider.registerAvailableLanguageKeys(['en']);
		$translateProvider.preferredLanguage('en');
	}
})();