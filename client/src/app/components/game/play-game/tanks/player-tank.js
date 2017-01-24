angular
	.module('components.game')
	.factory('PlayerTank', function($log, Tank, GameService) {
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

		return PlayerTank;
	});