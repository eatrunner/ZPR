(function() {
	'use strict';

	angular
		.module('tankGame')
		.controller('MuteButtonController', MuteButtonController);

	function MuteButtonController() {
		var $ctrl = this;

		$ctrl.muted = true;
		$ctrl.toggleMute = toggleMute;

		function toggleMute() {
			$ctrl.muted = !$ctrl.muted;
			//TODO
		}
	}
})();