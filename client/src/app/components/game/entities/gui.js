angular
	.module('app.components.game.entities')
	.factory('Gui', function(GameState, gameService) {
		var GAME_REFRESH_MS = 1000;
		var FACTOR = 16;
		function Gui(game, gameInfo, gameState) {
			this._game = game;
			this._running = false;

			gameState.onUpdate.add(this._update, this);

			this._helpText = game.add.text(
				game.world.width / 2,
				game.world.height - FACTOR, 
				"Use <ARROWS> to move, <SPACE> to shoot,\n<ESC> to pause/resume", { font: "6px Press Start 2P", fill: "#000", align: "center" });
			this._helpText.anchor.setTo(0.5, 0.5);

    		this._spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    		this._cursorKeys = game.input.keyboard.createCursorKeys();

    		this._spaceKey.onDown.add(this._shoot, this);
    		this._cursorKeys.up.onDown.add(this._movePlayer, this, null, "up");
    		this._cursorKeys.down.onDown.add(this._movePlayer, this, null, "down");
    		this._cursorKeys.right.onDown.add(this._movePlayer, this, null, "right");
    		this._cursorKeys.left.onDown.add(this._movePlayer, this, null, "left");

    		for(var it in this._cursorKeys) {
    			var key = this._cursorKeys[it];
	    		key.onHoldCallback = this._onKeyHoldCallback;
	    		key.onHoldContext = this;
	    	}
		}

		Gui.prototype._update = function(gameStateData) {
			if(gameStateData.status === GameState.Statuses.RUN) {
				this._running = true;
			} else {
				this._running = false;
			}
		};

		Gui.prototype._onKeyHoldCallback = function(key) {
			if(!key.downDuration(GAME_REFRESH_MS)) {
				var doHardReset = false;
				key.reset(doHardReset);
			}
		};

		Gui.prototype._movePlayer = function(key, direction) {
			if(!this._running)
				return;

			gameService
				.movePlayer(direction)
				.then(movePlayerCallback, movePlayerError);

			var self = this;
			function movePlayerCallback(response) {
				if(response.error)
					$log.warn(response.error);
			}

			function movePlayerError(reason) {
				$log.error(reason);
			}
		};

		Gui.prototype._shoot = function(key) {
			if(!this._running)
				return;

			gameService
				.playerShoot(this.id)
				.then(playerShootCallback, playerShootError);

			var self = this;
			function playerShootCallback(response) {
				if(response.error)
					$log.warn(response.error);
				self._sendingShoot = false;
			}

			function playerShootError(reason) {
				$log.error(reason);
				self._sendingShoot = false;
			}
		};

		return Gui;
	});