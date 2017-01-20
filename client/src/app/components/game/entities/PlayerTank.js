angular
	.module('app.components.game.entities')
	.factory('PlayerTank', function($log, Tank) {
		var FACTOR = 16;

		function PlayerTank(game, opts) {
			Tank.call(this, game, 
				this._getSpriteNameFromLevel(opts.level), 
				opts);
		}

		PlayerTank.prototype = Object.create(Tank.prototype);
		PlayerTank.prototype.constructor = Tank;
		PlayerTank.prototype._parent = Tank.prototype;

		PlayerTank.prototype._getSpriteNameFromLevel = function(level) {
			if(level < 0 || level > 3) {
				$log.error('Unsuported PlayerTank level:', level);
				// TODO: throw an exception?
			}

			return 'player' + level;
		};

		PlayerTank.prototype.update = function(opts) {
			this._parent.update.call(this, opts);
		};

		PlayerTank.prototype.changeLevel = function(level) {

		};

		PlayerTank.prototype.kill = function() {
			this._parent.kill.call(this);
		};

		return PlayerTank;
	});