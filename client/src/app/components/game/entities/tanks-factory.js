angular
	.module('app.components.game.entities')
	.factory('TanksFactory', function(PlayerTank, EnemyTank) {
		function TanksFactory(game, playerId) {
			this._game = game;
			this._playerId = playerId;
		}

		TanksFactory.prototype.createTank = function(tankData) {
			var playerId = tankData.playerId;
			// delete tankData.playerId; right, or not????

			if(playerId === this._playerId) {
				return new PlayerTank(this._game, tankData);
			} else {
				return new EnemyTank(this._game, tankData);
			}
		};

		return TanksFactory;
	});