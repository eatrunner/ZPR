angular
	.module('app.components.game.entities')
	.factory('Playground', function(Map, TanksGroup, BulletsGroup, GameState) {

		function Playground(game, gameInfo, gameState) {
			this._game = game;

			this._map = new Map(game, gameInfo.mapWidth, gameInfo.mapHeight, gameInfo.map);
			this._tanksGroup = new TanksGroup(game, gameInfo.playerId);
			this._bulletsGroup = new BulletsGroup(game, gameInfo.playerId);
			// this._bonusesGroup = new BonusesGroup(game, gameInfo.playerId);

			this.group = game.add.group();
			this.group.add(this._map.group);
			this.group.add(this._tanksGroup.group);
			this.group.add(this._bulletsGroup.group);

			this.group.x = this._game.world.width/2 - this.group.width/2;
			this.group.y = this._game.world.height/2 - this.group.height/2;

			gameState.onUpdate.add(this._update, this);
		}

		Playground.prototype._update = function(gameStateData) {
			if(gameStateData.status === GameState.Statuses.RUN) {
				this._map.update(gameStateData.map);
				this._tanksGroup.update(gameStateData.tanks);
				this._bulletsGroup.update(gameStateData.bullets);
			}
		};

		return Playground;
	});