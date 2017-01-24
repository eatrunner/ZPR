var newGameForm = {
	controller: 'NewGameFormController',
	templateUrl: './new-game-form.html',
	bindings: {
		availableMaps: '<',
		onSubmit: '&',
		error: '@'
	}
};

/*
 * @ngdoc component
 * @module app.components.game
 * @name newGameForm
 *
 * @description
 *
 * ## Lorem Ipsum 1
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 *
 * ## Lorem Ipsum 2
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 */
angular
	.module('app.components.game')
	.component('newGameForm', newGameForm);