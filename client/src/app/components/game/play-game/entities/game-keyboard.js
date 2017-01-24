angular
	.module('app.components.game')
	.factory('GameKeyboard', function(GameState, GameService) {
		var GAME_REFRESH_MS = 1000;
		function GameKeyboard(game, gameInfo, gameState) {
			this._game = game;

			this._gameState = gameState;
			// gameState.onUpdate.add(this._update, this); not needed ?

    		this._cursorKeys = game.input.keyboard.createCursorKeys();
    		for(var it in this._cursorKeys) {
    			var key = this._cursorKeys[it];
	    		key.onHoldCallback = this._onKeyHoldCallback;
	    		key.onHoldContext = this;
	    	}

    		this._cursorKeys.up.onDown.add(this._cursorOnDownCallback, this, null, "up");
    		this._cursorKeys.down.onDown.add(this._cursorOnDownCallback, this, null, "down");
    		this._cursorKeys.right.onDown.add(this._cursorOnDownCallback, this, null, "right");
    		this._cursorKeys.left.onDown.add(this._cursorOnDownCallback, this, null, "left");

    		this._fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    		this._fireKey.onDown.add(this._fireOnDownCallback, this);

    		this._pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    		this._pauseKey.onDown.add(this._pauseKeyOnDownCallback, this);
		}

		GameKeyboard.prototype._update = function(newGameState) {
			// empty body ?
		};

		GameKeyboard.prototype._onKeyHoldCallback = function(key) {
			if(!key.downDuration(GAME_REFRESH_MS)) {
				var doHardReset = false;
				key.reset(doHardReset);
			}
		};

		GameKeyboard.prototype._cursorOnDownCallback = function(key, direction) {
			if(this._gameState.status === GameState.Statuses.RUN)
				return;

			GameService
				.movePlayer(direction)
				.then(movePlayerCallback, movePlayerError);

			var self = this;
			function movePlayerCallback(response) {

			}

			function movePlayerError(reason) {
				$log.error(reason);
			}
		};

		GameKeyboard.prototype._fireOnDownCallback = function(key) {
			console.log('fire');
			if(this._gameState.status === GameState.Statuses.RUN)
				return;

			GameService
				.playerShoot(this.id)
				.then(playerShootCallback, playerShootError);

			var self = this;
			function playerShootCallback(response) {
			}

			function playerShootError(reason) {
				$log.error(reason);
			}
		};

		GameKeyboard.prototype._pauseKeyOnDownCallback = function() {
			if(this._running)
				return;

			GameService
				.playerShoot(this.id)
				.then(playerShootCallback, playerShootError);

			var self = this;
			function playerShootCallback(response) {

			}

			function playerShootError(reason) {
				$log.error(reason);
			}
		};

		return GameKeyboard;
	});