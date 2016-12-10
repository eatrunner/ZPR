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