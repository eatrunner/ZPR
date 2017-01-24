function NewGameFormController() {
  var $ctrl = this;
  
  $ctrl.$onInit = function() {
    $ctrl.itemArray = $ctrl.availableMaps;
    $ctrl.selected = $ctrl.itemArray[0];
  };

  $ctrl.submitForm = function() {
    $ctrl.onSubmit({
        mapId: $ctrl.selected
    });
  };
}

/*
 * @ngdoc controller
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
  .controller('NewGameFormController', NewGameFormController);
