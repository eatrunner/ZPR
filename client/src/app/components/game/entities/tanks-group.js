angular
	.module('app.components.game.entities')
	.factory('TanksGroup', function(TanksFactory) {
		function TanksGroup(game, playerId) {
			this.group = game.add.group();

			this._game = game;
			this._tanksMap = {};
			this._tanksFactory = new TanksFactory(game, playerId);
		}
		
		TanksGroup.prototype.update = function(tanksData) {
			var oldTanksMap = this._tanksMap;
			this._tanksMap = {};

			for(var i in tanksData) {
				var tankData = tanksData[i];
				var id = tankData.id;

				var tank = oldTanksMap[id];
				var wasTank = (tank !== undefined)
				if(wasTank) {
					tank.update(tankData);

					delete oldTanksMap[id];
					this._tanksMap[id] = tank;
				} else {
					tank = this._tanksFactory.createTank(tankData);
					this._tanksMap[id] = tank;
					this.group.add(tank.sprite);
				}
			}

			for(var id in oldTanksMap) {			
			    var tank = oldTanksMap[id];
			    tank.kill();
			}
		}

		return TanksGroup;
	});