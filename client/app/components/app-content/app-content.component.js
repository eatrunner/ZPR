(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('appContent', {
			templateUrl: 'components/app-content/app-content.html',
			controller: 'AppContentController',
			transclude: true
		});
})();