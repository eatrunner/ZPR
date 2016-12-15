(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('settings', {
			templateUrl: 'views/settings/settings.html',
			controller: 'SettingsController'
		});
})();