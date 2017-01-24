function NewGameController(GameService, $log, $state) {
  var $ctrl = this;

  $ctrl.createGame = function(mapId) {
  	return GameService
  		.createGame(mapId)
  		.then($ctrl._gameCreated, $ctrl._gameCreateError);
  };

  $ctrl._gameCreated = function() {
  	$state.go('playGame');
  };

  $ctrl._gameCreateError = function(reason) {
  	$log.error(reason);
  	$ctrl.error = reason;
  };
}

/*
 * @ngdoc type
 * @module common
 * @name CreateController
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
  .controller('NewGameController', NewGameController);
