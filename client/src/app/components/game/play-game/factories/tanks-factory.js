angular
	.module('components.game')
	.factory('TanksFactory', function(PlayerTank, EnemyTank) {
		
		function TanksFactory(game) {
			this._game = game;
		}

		TanksFactory.PLAYER_ID = 0;

		TanksFactory.prototype.create = function(tankData) {
			var id = tankData.id;
			if(id === TanksFactory.PLAYER_ID) {
				return new PlayerTank(this._game, tankData);
			} else {
				return new EnemyTank(this._game, tankData);
			}
		};

		return TanksFactory;
	});