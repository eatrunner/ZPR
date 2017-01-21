angular
	.module('app.components.game.entities')
	.factory('TanksGroup', function(TanksFactory) {
		function TanksGroup(game, playerId) {
			this.group = game.add.group();

			this._game = game;
			this._playerId = playerId;
			this._tanksMap = {};
			this._tanksFactory = new TanksFactory(game, playerId);
		}

		TanksGroup.prototype.update = function(tanksData) {
			for(var i = 0; i < tanksData.length; ++i) {
				var tankData = tanksData[i];
				var id = tankData.id;
				var tanksMapContainsId = (this._tanksMap.hasOwnProperty(id));
				if(tanksMapContainsId) {
					this._tanksMap[id].update(tankData);
				} else {
					var tank = this._tanksFactory.createTank(tankData);
					this._tanksMap[id] = tank;
					this.group.add(tank.sprite);
				}
			}
		}

		return TanksGroup;
	});