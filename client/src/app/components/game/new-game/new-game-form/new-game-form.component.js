/**
 * @ngdoc directive
 * @name components.game.directive:newGameForm
 * @restrict E
 * @requires NewGameFormController
 * @scope
 * @param {Array<number>} availableMaps OneWay - List of possible `mapId` values
 * @param {Function} onSubmit Callback -  function, when user hits `submit` button
 * @param {string} error Input - reject message from parent
 * @description
 *	Reusable component that collects options for 
 * 	game create process and submits selected values to the parent
 */
var newGameForm = {
	controller: 'NewGameFormController',
	templateUrl: './new-game-form.html',
	bindings: {
		availableMaps: '<',
		onSubmit: '&',
		error: '@'
	}
};

angular
	.module('components.game')
	.component('newGameForm', newGameForm);