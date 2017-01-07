angular
	.module('app', [
		'ui.router',
		'app.common',
		'app.components',
		'app.game',
		'app.templates',
		'pascalprecht.translate'
	])
	.config(function ($translateProvider, $urlRouterProvider) {
		$translateProvider.useStaticFilesLoader({
		    prefix: '../translations/',
		    suffix: '.json'
		});
		$translateProvider.preferredLanguage('en');

		$urlRouterProvider.otherwise('/menu');
	});