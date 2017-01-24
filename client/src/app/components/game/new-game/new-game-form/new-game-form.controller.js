/**
 * @ngdoc controller
 * @name components.game.controller:NewGameFormController
 * @description
 *  Controller of component `newGameForm`. 
 *  It controls process of defining new game options (at the moment - selecting correct mapId).
 *  On submit, it sends chosen value of mapId to the parent.
 */
function NewGameFormController() {
  var $ctrl = this;
  
  /**
   * @ngdoc property
   * @name selected
   * @propertyOf components.game.controller:NewGameFormController
   * @description
   * Holds selected `mapId`
   */
  $ctrl.selected = undefined;

  /**
   * @ngdoc method
   * @name $onInit
   * @methodOf components.game.controller:NewGameFormController
   * @description
   * Inits `selected` property as first of `availableMaps`
   */
  $ctrl.$onInit = function() {
    $ctrl.selected = $ctrl.availableMaps[0];
  };

  /**
    * @ngdoc method
    * @name submitForm
    * @methodOf components.game.controller:NewGameFormController
    * @description
    * It calls parent's `onSubmit` function with `selected` as mapId.
    * @example
    * <pre>
    *   <form novalidate ng-submit="$ctrl.submitForm();">
    *     <button type="submit">
    *      Create the game!
    *     </button>
    *   </form>
    * </pre>
  */
  $ctrl.submitForm = function() {
    $ctrl.onSubmit({
        mapId: $ctrl.selected
    });
  };
}

angular
  .module('components.game')
  .controller('NewGameFormController', NewGameFormController);
