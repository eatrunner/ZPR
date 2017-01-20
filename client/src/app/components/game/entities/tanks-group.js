angular
	.module('app.components.game.entities')
	.factory('TanksGroup', function(PlayerTank, EnemyTank) {

		function TanksGroup(game) {
			this.game = game;
			this.group = game.add.group();

			this._tanksMap = {};
		}

		TanksGroup.prototype._tanksMap = null;

		TanksGroup.prototype.updateTanks = function(tanksData) {
			
		}

		return TanksGroup;
	});