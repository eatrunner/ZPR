(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('selectMapDropdown', {
			templateUrl: 'components/select-map-dropdown/select-map-dropdown.html',
			controller: 'SelectMapDropdownController'
		});
})();