(function() {
	'use strict';

	angular
		.module('tankGame')
		.controller('StartController', StartController);

	function StartController($timeout, $scope) {
		var $ctrl = this;

		$ctrl.onItemAccept = onItemAccept;

		$ctrl.menuItems = {
			'SINGLE_PLAYER': 'single-player',
			'MULTI_PLAYER': 'multi-player',
			'HIGH_SCORES': 'highscores',
			'SETTINGS': 'settings'
		};

		function onItemAccept(item) {
			alert('You have selected: ' + item.itemText);
		}
	}
})();