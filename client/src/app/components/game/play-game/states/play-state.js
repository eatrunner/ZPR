angular
  	.module('components.game')
  	.factory('PlayState', function($log, WelcomeScreen, Playground, Gui, GameService, GAME_STATUSES) {
  		var GAME_REFRESH_MS = 1000;

		function PlayState(game, scope) {
			this._game = game;
			this._scope = scope;
		}

		PlayState.prototype._gameInfo = null;
		PlayState.prototype._playground = null;
		PlayState.prototype._timer = null;
		PlayState.prototype._gui = null;

		PlayState.prototype.init = function(gameInfo) {
			this._gameInfo = gameInfo;
		};

		PlayState.prototype.create = function() {
			this._running = false;
			this._welcomeScreen = new WelcomeScreen(this._game, this._gameInfo);

			this._playground = new Playground(this._game, this._gameInfo, this._scope);
			this._gui = new Gui(this._game, this._gameInfo, this._scope);
			this._timer = Date.now();

			this._game.world.bringToTop(this._welcomeScreen.group);
			this._welcomeScreen.hide();
			this._running = true;
		};

		PlayState.prototype.shutdown = function() {
			this._playground.kill();
			this._gui.kill();
		};

		PlayState.prototype.update = function() {
			if(!this._running)
				return;

			var now = Date.now();
			var diff = now - this._timer;
			if(diff < GAME_REFRESH_MS)
				return;

			var lateTime = (diff - GAME_REFRESH_MS);
			this._timer = now + lateTime;

			GameService
				.updateState()
				.then(this._getStateCallback.bind(this),
					this._getStateError.bind(this));
		};

		PlayState.prototype._getStateCallback = function(gameState) {
			if(gameState.status === GAME_STATUSES.WIN)
				this._game.state.start('win');
			else if(gameState.status === GAME_STATUSES.LOSE)
				this._game.state.start('lose');
		};

		PlayState.prototype._getStateError = function(message) {
			$log.error(message);
		};

		return PlayState;
	});