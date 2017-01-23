angular
	.module('app.components.game.entities')
	.factory('Playground', function(Map, GameState, BonusesGroup, TanksGroup, BulletsGroup) {
		var FACTOR = 16;
		var GAME_MAX_WIDTH = 16;
		var GAME_MARGIN_LEFT = 4;
		var GAME_MARGIN_TOP = 2;

		function Playground(game, gameInfo, gameState) {
			this._game = game;

			this._map = new Map(game, gameInfo.mapWidth, gameInfo.mapHeight, gameInfo.map);
			this._tanksGroup = new TanksGroup(game);
			this._bulletsGroup = new BulletsGroup(game);
			this._bonusesGroup = new BonusesGroup(game);

			this.group = game.add.group();
			this.group.add(this._map.group);
			this.group.add(this._tanksGroup.group);
			this.group.add(this._bulletsGroup.group);
			this.group.add(this._bonusesGroup.group);

			this.group.x = FACTOR * (GAME_MARGIN_LEFT - 1 + (GAME_MAX_WIDTH - gameInfo.mapWidth)/2);
			this.group.y = FACTOR * GAME_MARGIN_TOP;

			gameState.onUpdate.add(this._update, this);
		}

		Playground.prototype._update = function(gameStateData) {
			if(gameStateData.status === GameState.Statuses.RUN) {
				this._map.update(gameStateData.map);
				this._tanksGroup.update(gameStateData.tanks);
				this._bulletsGroup.update(gameStateData.bullets);
				this._bonusesGroup.update(gameStateData.bonuses);
			}
		};

		return Playground;
	});