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
		}

		PlayerTank.prototype._colourTank = function() {
			this.sprite.tint = "0xffbb00";
		};

		PlayerTank.prototype.update = function(opts) {
			this._parent.update.call(this, opts);
		};

		PlayerTank.prototype.kill = function() {
			this._parent.kill.call(this);
		};

		return PlayerTank;
	});