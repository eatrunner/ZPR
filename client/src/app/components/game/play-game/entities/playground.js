angular
	.module('components.game')
	.factory('Playground', function(Map, BonusesGroup, TanksGroup, BulletsGroup) {
		var FACTOR = 16;

		function Playground(game, gameInfo, scope) {
			this._game = game;

			this._map = new Map(game, gameInfo, scope);
			this._tanksGroup = new TanksGroup(game, gameInfo, scope);
			this._bulletsGroup = new BulletsGroup(game, gameInfo, scope);
			this._bonusesGroup = new BonusesGroup(game, gameInfo, scope);

			this.group = game.add.group();
			this.group.add(this._map.group);
			this.group.add(this._tanksGroup.group);
			this.group.add(this._bulletsGroup.group);
			this.group.add(this._bonusesGroup.group);

			this.group.x = game.world.width/2 - gameInfo.mapWidth*FACTOR/2;
			this.group.y = game.world.height/2 - gameInfo.mapHeight*FACTOR/2;
		}

		Playground.prototype.kill = function() {
			this._map.kill();
			this._tanksGroup.kill();
			this._bulletsGroup.kill();
			this._bonusesGroup.kill();
		};

		return Playground;
	});