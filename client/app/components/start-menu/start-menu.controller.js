(function() {
	'use strict';

	angular
		.module('tankGame')
		.controller('StartMenuController', StartMenuController);

	function StartMenuController($scope) {
		var $ctrl = this;

		var items = [];
		var selectedItemIndex;
		var eventHandler;

		$ctrl.$onInit = onInit;
		$ctrl.$onDestroy = onDestroy;
		$ctrl.addItem = addItem;

		function onInit() {
			eventHandler = $scope.$on('KEY_DOWN', onKeyDown);
		}

		function onDestroy() {
			if(eventHandler)
				eventHandler();
		}

		function onKeyDown(event, keyCode) {
			var functionToApply;

			if(keyCode === 'GAME_UP') {
				functionToApply = shiftSelectionUp;
			} else if(keyCode === 'GAME_DOWN') {
				functionToApply = shiftSelectionDown;
			} else if(keyCode === 'GAME_START') {
				functionToApply = acceptSelectedItem;
			}

			if(functionToApply) {
				var audio = new Audio('sounds/sfx-menu-select.wav');
        		audio.play();
				$scope.$apply(functionToApply);
			}
		}

		function selectItem(newSelectedIndex) {
			angular.forEach(items, function(item) {
				item.selected = false;
			});

			items[newSelectedIndex].selected = true;
			selectedItemIndex = newSelectedIndex;
		}

		function shiftSelectionUp() {
			if(selectedItemIndex > 0)
				selectItem(selectedItemIndex - 1);
		}

		function shiftSelectionDown() { 
			if(selectedItemIndex < items.length - 1) 
				selectItem(selectedItemIndex + 1);
		}

		function acceptSelectedItem() {
			$ctrl.onItemAccept({
				item: items[selectedItemIndex]
			});
		}

		function addItem(item) {
			if(items.length === 0) {
				item.selected = true;
				selectedItemIndex = 0;
			}

			items.push(item);
		}
	}
})();