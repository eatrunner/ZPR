(function() {
	'use strict';

	angular
		.module('tankGame')
		.controller('TankGameController', TankGameController);

	function TankGameController() {
		var $ctrl = this;

		$ctrl.keyDownEvents = {
			'ArrowUp': 'GAME_UP',
			'ArrowDown': 'GAME_DOWN',
			'ArrowLeft': 'GAME_LEFT',
			'ArrowRight': 'GAME_RIGHT',
			'Space': 'GAME_FIRE',
			'Enter': 'GAME_START'
		};

		$ctrl.$onInit = onInit;

		function onInit() {

		}
	}
})();