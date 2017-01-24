angular
  	.module('app.components.game')
  	.factory('PlayState', function(GameState, WelcomeScreen, Playground, Gui, GameKeyboard) {
  		var GAME_REFRESH_MS = 1000;

		function PlayState(game) {
			this._game = game;
		}

		PlayState.prototype._gameInfo = null;
		PlayState.prototype._gameState = null;
		PlayState.prototype._playground = null;
		PlayState.prototype._timer = null;
		PlayState.prototype._gui = null;

		PlayState.prototype.init = function(gameInfo) {
			this._gameInfo = gameInfo;
		};

		PlayState.prototype.create = function() {
			this._welcomeScreen = new WelcomeScreen(this._game, this._gameInfo);

			this._gameState = new GameState();

			this._playground = new Playground(this._game, this._gameInfo, this._gameState);
			this._gui = new Gui(this._game, this._gameInfo, this._gameState);
			this._gameKeyboard = new GameKeyboard(this._game, this._gameInfo, this._gameState);
			this._timer = Date.now();

			this._game.world.bringToTop(this._welcomeScreen.group);
			this._welcomeScreen.hide();
		};

		PlayState.prototype.update = function() {
			var now = Date.now();
			var diff = now - this._timer;
			if(diff > GAME_REFRESH_MS) {
				this._gameState.update();
				var lateTime = (diff - GAME_REFRESH_MS);
				this._timer = now + lateTime;
			}
		};

		return PlayState;
	});