angular
  	.module('app.components.game.states')
  	.factory('PlayState', function(GameState, Playground, BeginMenu, PauseMenu, Gui) {
  		var GAME_REFRESH_MS = 1000;

		function PlayState(game) {
			this._game = game;
		}

		PlayState.prototype._gameInfo = null;
		PlayState.prototype._gameState = null;
		PlayState.prototype._world = null;
		PlayState.prototype._timer = null;

		PlayState.prototype.init = function(gameInfo) {
			this._gameInfo = gameInfo;
		}

		PlayState.prototype.create = function() {
			this._gameState = new GameState();
			this._playground = new Playground(this._game, this._gameInfo, this._gameState);
			this._beginMenu = new BeginMenu(this._game, this._gameInfo, this._gameState);
			this._gui = new Gui(this._game, this._gameInfo, this._gameState);
			this._pauseMenu = new PauseMenu(this._game, this._gameInfo, this._gameState);

			this._timer = Date.now();
		};

		PlayState.prototype.update = function() {
			var now = Date.now();
			if(now - this._timer > GAME_REFRESH_MS) {
				this._gameState.update();
				this._timer = now;
			}
		};

		return PlayState;
	});