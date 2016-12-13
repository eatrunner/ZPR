(function() {
	'use strict';

	angular
		.module('tankGame')
		.component('muteButton', {
			templateUrl: 'components/app-content/mute-button/mute-button.html',
			controller: 'MuteButtonController'
		});
})();