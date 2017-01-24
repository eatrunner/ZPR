/**
* @ngdoc overview
* @name root
* @requires common
* @requires components
* @requires templates
*
* @description
* # components
* This is the root module. It is the start point of application.
*
* Its config phase defines default route: to the **`menu`** component
*/
angular
	.module('root', [
		'ui.bootstrap',
		'pascalprecht.translate',
		'ui.select',
		'ui.router',
		
		'common',
		'components',
		'templates'
	])
	.config(function($translateProvider, $urlRouterProvider) {
		$translateProvider.useStaticFilesLoader({
		    prefix: '../translations/',
		    suffix: '.json'
		});
		$translateProvider.preferredLanguage('en');

		$urlRouterProvider.otherwise('/menu');
	});

	