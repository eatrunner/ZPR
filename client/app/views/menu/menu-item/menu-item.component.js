(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('menuItem', {
			templateUrl: 'views/menu/menu-item/menu-item.html',
			transclude: true,
		});
})();