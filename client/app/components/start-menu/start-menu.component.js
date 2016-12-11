(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('startMenu', {
			templateUrl: 'components/start-menu/start-menu.html',
			controller: 'StartMenuController',
			transclude: true,
			bindings: {
				onItemAccept: '&'
			}
		});
})();