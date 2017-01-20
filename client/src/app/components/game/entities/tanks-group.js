angular
	.module('app.components.game.entities')
	.factory('TanksGroup', function(PlayerTank, EnemyTank) {

		function TanksGroup(game) {
			this._game = game;
			this.group = game.add.group();

			this._tanksMap = {};
		}

		TanksGroup.prototype.updateTanks = function(tanksData) {
			
		}

		return TanksGroup;
	});