(function() {
	'use strict';

	angular
		.module('tankGame')
		.controller('LangButtonController', LangButtonController);

	function LangButtonController() {
		var $ctrl = this;

		$ctrl.openLanguageDropdown = openLanguageDropdown;

		function openLanguageDropdown() {
			//TODO
		}
	}
})();