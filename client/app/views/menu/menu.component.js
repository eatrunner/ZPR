(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('menu', {
			templateUrl: 'views/menu/menu.html',
			controller: 'MenuController'
		});
})();