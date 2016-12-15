(function() {
	'use strict';

	angular
		.module('tankGame')
		.controller('SelectMapDropdownController', SelectMapDropdownController);

	function SelectMapDropdownController($state) {
		var $ctrl = this;
		
		$ctrl.change = function() {
			$state.go('.', {mapId: 1}, {notify: false});
		}
	}

})();