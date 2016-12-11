(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('startMenuItem', {
			templateUrl: 'components/start-menu-item/start-menu-item.html',
			controller: 'StartMenuItemController',
			bindings: {
				itemText: '@'
			},
			require: {
				startMenuCtrl: '^startMenu',
			}
		});
})();