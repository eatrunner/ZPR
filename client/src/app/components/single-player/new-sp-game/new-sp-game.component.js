var newSpGame = {
  controller: 'NewSpGameController',
  templateUrl: './new-sp-game.html',
  bindings: {
  	availableMaps: '<'
  }
};

angular
  .module('app.components.single-player')
  .component('newSpGame', newSpGame);
