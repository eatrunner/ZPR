(function() {
	'use strict';

	angular
		.module('tankGame')
		.controller('TankGameController', TankGameController);

	function TankGameController() {
		var $ctrl = this;

		$ctrl.$onInit = onInit;

		function onInit() {
			alert('Welcome to the Tank Game!');
		}
	}
})();