angular
	.module('app.components.game.entities')
	.factory('TankGame', function(BeforePlayScreen, Map, TanksGroup, BulletsGroup) {

		function TankGame(game, gameInfo) {
			this._game = game;
			this._beforePlayScreen = new BeforePlayScreen(game, gameInfo);

			this._game.stage.backgroundColor = "#808080";
			this._map = new Map(game, gameInfo.mapWidth, gameInfo.mapHeight, gameInfo.map);
			this._tanksGroup = new TanksGroup(game, gameInfo.playerId);
			this._bulletsGroup = new BulletsGroup(game, gameInfo.playerId);
			// this._bonusesGroup = new BonusesGroup(game, gameInfo.playerId);

			this._group = game.add.group();
			this._group.add(this._map.group);
			this._group.add(this._tanksGroup.group);
			this._group.add(this._bulletsGroup.group);
			this._group.x = 4*16;
			this._group.y = 2*16;
			
			game.world.bringToTop(this._beforePlayScreen.group);
		}

		TankGame.prototype.startGame = function() {
			this._beforePlayScreen.hide();

			var fx = this._game.add.audio('start-game');
			fx.allowMultiple = true;
			fx.play();
		};

		TankGame.prototype.updateState = function(newState) {
			// console.log('New state: ', newState);
			this._tanksGroup.update(newState.tanks);
			this._bulletsGroup.update(newState.bullets);
		};

		return TankGame;
	});