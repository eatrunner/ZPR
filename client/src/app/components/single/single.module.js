
/**
 *
 * @ngdoc module
 * @name components
 *
 * @requires components.contact
 * @requires components.auth
 *
 * @description
 *
 * This is the components module. It includes all of our components.
 *
 **/
angular
	.module('app.components.single', [
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('single', {
		        url: '/single',
		        component: 'single'
		    });
	});
