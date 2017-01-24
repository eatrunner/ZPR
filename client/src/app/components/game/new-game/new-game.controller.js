/**
 * @ngdoc controller
 * @name components.game.controller:NewGameController
 * @description
 *  Controller of component `newGame`. 
 *  Provides method to create a new game. 
 *  On success of game creation, it redirects into `playGame` state.
 */
function NewGameController(GameService, $log, $state) {
  var $ctrl = this;

  /**
   * @ngdoc property
   * @name error
   * @propertyOf components.game.controller:NewGameController
   * @description
   * Property that holds error message acquired from `createGame` request.
  */
  $ctrl.error = "";

  /**
   * @ngdoc method
   * @name createGame
   * @methodOf components.game.controller:NewGameController
   * @param {number} mapId ID of the map in which game should start
   * @return {Promise} Promise object from `gameService.createGame`.
   * @description
   * This method will call `createGame` from `GameService`
   * 
   * After resolve, this will call `_gameCreated` function
   * 
   * When it rejects, `_gameCreateError` will be invoked.
  */
  $ctrl.createGame = function(mapId) {
  	return GameService
  		.createGame(mapId)
  		.then($ctrl._gameCreated, $ctrl._gameCreateError);
  };

  /**
   * @ngdoc method
   * @name _gameCreated
   * @methodOf components.game.controller:NewGameController
   * @private
   * @description 
   * Private method, will be called after successfull call to the `createGame` function.
   * 
   * It switches application into state `playGame`
  */
  $ctrl._gameCreated = function() {
  	$state.go('playGame');
  };

  /**
   * @ngdoc method
   * @name _gameCreateError
   * @methodOf components.game.controller:NewGameController
   * @private
   * @description 
   * Private method, will be called after rejected call to the `createGame` function.
   * 
   * It prints error message to the console and sets `error` variable
  */
  $ctrl._gameCreateError = function(reason) {
  	$log.error(reason);
  	$ctrl.error = reason;
  };
}

angular
  .module('components.game')
  .controller('NewGameController', NewGameController);
