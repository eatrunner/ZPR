
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
	.module('app.components.menu', [
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('menu', {
		        url: '/menu',
		        component: 'menu'
		    });
	});
