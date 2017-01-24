angular
	.module('components.game')
	.factory('Keyboard', function(GameService, GAME_EVENTS, GAME_STATUSES) {
		var GAME_REFRESH_MS = 1000;
		var FACTOR = 16;

		function Keyboard(game, gameInfo, scope) {
			this._game = game;
			this._status = gameInfo.status;
			this._deregStatusListener = scope.$on(GAME_EVENTS.STATUS_UPDATE,
				this._updateCallback.bind(this));

			this._createKeys();
		}

		Keyboard.prototype.kill = function() {
			this._deregStatusListener();
		};

		Keyboard.prototype._updateCallback = function(event, newStatus, oldStatus) {
			this._status = newStatus;
		};

		Keyboard.prototype._createKeys = function() {
			this._cursorKeys = this._game.input.keyboard.createCursorKeys();
    		for(var it in this._cursorKeys) {
    			var key = this._cursorKeys[it];
	    		key.onHoldCallback = this._onKeyHoldCallback;
	    		key.onHoldContext = this;
	    	}

    		this._cursorKeys.up.onDown.add(this._onCursorDownCallback, this, null, "up");
    		this._cursorKeys.down.onDown.add(this._onCursorDownCallback, this, null, "down");
    		this._cursorKeys.right.onDown.add(this._onCursorDownCallback, this, null, "right");
    		this._cursorKeys.left.onDown.add(this._onCursorDownCallback, this, null, "left");

    		this._fireKey = this._game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    		this._fireKey.onDown.add(this._onFireDownCallback, this);

    		this._pauseKey = this._game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    		this._pauseKey.onDown.add(this._onPauseDownCallback, this);
		};	

		Keyboard.prototype._onKeyHoldCallback = function(key) {
			if(!key.downDuration(GAME_REFRESH_MS)) {
				var doHardReset = false;
				key.reset(doHardReset);
			}
		};

		Keyboard.prototype._onCursorDownCallback = function(key, direction) {
			if(this._status !== GAME_STATUSES.RUN)
				return;

			GameService
				.movePlayer(direction)
				.catch(movePlayerError);

			function movePlayerError(reason) {
				$log.error(reason);
			}
		};

		Keyboard.prototype._onFireDownCallback = function(key) {
			if(this._status !== GAME_STATUSES.RUN)
				return;

			GameService
				.playerShoot()
				.catch(playerShootError);

			function playerShootError(reason) {
				$log.error(reason);
			}
		};

		Keyboard.prototype._onPauseDownCallback = function() {
			if(this._status === GAME_STATUSES.PAUSE)
				this._resumeGame();
			else if(this._status === GAME_STATUSES.RUN)
				this._pauseGame();
		};

		Keyboard.prototype._pauseGame = function() {
			GameService
				.pauseGame()
				.catch(playerShootError);

			function playerShootError(reason) {
				$log.error(reason);
			}
		};

		Keyboard.prototype._resumeGame = function() {
			GameService
				.resumeGame()
				.catch(playerShootError);

			function playerShootError(reason) {
				$log.error(reason);
			}
		};

		return Keyboard;
	});