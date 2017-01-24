/**
* @ngdoc overview
* @name components.menu
* @description
* # components.menu
* It contains `menu` component. 
*
* It's config function declares state `menu`.
*/
angular
	.module('components.menu', [
		'ui.router'
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('menu', {
		        url: '/menu',
		        component: 'menu'
		    });
	});
