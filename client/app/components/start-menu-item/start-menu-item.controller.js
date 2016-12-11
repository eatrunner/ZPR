(function() {
	'use strict';

	angular
		.module('tankGame')
		.controller('StartMenuItemController', StartMenuItemController);

	function StartMenuItemController() {
		var $ctrl = this;

		$ctrl.$onInit = onInit;

		function onInit() {
			/*jshint validthis: true */
			$ctrl.startMenuCtrl.addItem(this);
		}
	}
})();