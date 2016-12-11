(function() {
	'use strict';

	angular
		.module('tankGame')
		.controller('StartController', StartController);

	function StartController($timeout, $scope) {
		var $ctrl = this;

		$ctrl.onItemAccept = onItemAccept;

		$ctrl.menuItemsTexts = [
			'1_PLAYER',
			'2_PLAYERS',
			'HIGH_SCORES',
			'SETTINGS'
		];

		function onItemAccept(item) {
			alert('You have selected: ' + item.itemText);
		}
	}
})();