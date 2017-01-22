angular
	.module('app.components.game.entities')
	.factory('PlayerTank', function($log, Tank, Directionable, gameService) {
		var FACTOR = 16;

		PlayerTank.prototype = Object.create(Tank.prototype);
		PlayerTank.prototype.constructor = PlayerTank;
		PlayerTank.prototype._parent = Tank.prototype;

		function PlayerTank(game, opts) {
			Tank.call(this, game, 
				'player1',
				opts);

			this._colourTank();

    		this._spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    		this._spaceKey.onDown.add(this._shoot, this);
    		this._cursorKeys = game.input.keyboard.createCursorKeys();
    		this._cursorKeys.up.onDown.add(this._movePlayer, this, null, Directionable.Direction.UP);
    		this._cursorKeys.down.onDown.add(this._movePlayer, this, null, Directionable.Direction.DOWN);
    		this._cursorKeys.right.onDown.add(this._movePlayer, this, null, Directionable.Direction.RIGHT);
    		this._cursorKeys.left.onDown.add(this._movePlayer, this, null, Directionable.Direction.LEFT);

    		this._sendingMove = false;
    		this._sendingShoot = false;
		}

		PlayerTank.prototype._movePlayer = function(key, direction) {
			if(this._sendingMove)
				return;
	
			this._sendingMove = true;
			gameService
				.movePlayer(this.id, direction)
				.then(movePlayerCallback, movePlayerError);

			var self = this;
			function movePlayerCallback(response) {
				if(response.error)
					$log.warn(response.error);
				self._sendingMove = false;
			}

			function movePlayerError(reason) {
				$log.error(reason);
				self._sendingMove = false;
			}
		};	

		PlayerTank.prototype._shoot = function() {
			if(this._sendingShoot)
				return;

			this._sendingShoot = true;
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

		PlayerTank.prototype._colourTank = function() {
			this.sprite.tint = "0xffbb00";
		};

		PlayerTank.prototype.update = function(opts) {
			this._parent.update.call(this, opts);
		};

		PlayerTank.prototype.kill = function() {
			this._spaceKey.onDown.remove(this._shoot, this);
			for(var key in this._cursorKeys)
				this._cursorKeys[key].onDown.remove(this._movePlayer, this);
			this._parent.kill.call(this);
		};

		return PlayerTank;
	});