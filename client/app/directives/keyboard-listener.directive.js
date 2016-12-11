(function() {
	'use strict';

	angular
		.module('tankGame')
		.directive('keyboardListener', keyboardListener);

	function keyboardListener($document, $rootScope) {
		return {
			restrict: 'A',
			link: linkFunction,
			scope: {
				keys: '='
			}
		};

		function linkFunction(scope, element, attrs) {
			$document.bind('keydown', keyDownEventOccured);
			$document.bind('keyup', keyUpEventOccured);

			function keyUpEventOccured(keyEvent) {
				angular.forEach(scope.keys, function(keyDispatchEvent, keyCode) {
					if(keyEvent.code === keyCode) {
						keyEvent.preventDefault();
						$rootScope.$broadcast('KEY_UP', keyDispatchEvent);
					}
				});
			}

			function keyDownEventOccured(keyEvent) {
				angular.forEach(scope.keys, function(keyDispatchEvent, keyCode) {
					if(keyEvent.code === keyCode) {
						keyEvent.preventDefault();
						$rootScope.$broadcast('KEY_DOWN', keyDispatchEvent);
					}
				});
			}
		}
	}
})();