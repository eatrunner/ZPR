angular
	.module('app', [
		'ui.router',
		'ui.bootstrap',
		'app.common',
		'app.components',
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