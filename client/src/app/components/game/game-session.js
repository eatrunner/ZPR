angular
    .module('components.game')
    .service('GameSession', function () {
      this.create = function (gameId) {
        this.gameId = gameId;
      };
      this.destroy = function () {
        this.gameId = null;
      };
    });