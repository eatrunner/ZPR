angular
	.module('app.components.game.entities')
	.factory('EnemyTank', function($log, Tank) {
		var FACTOR = 16;

		function EnemyTank(game, opts) {
			Tank.call(this, game, 
				'enemy1',
				opts);
		}
		
		EnemyTank.prototype = Object.create(Tank.prototype);
		EnemyTank.prototype.constructor = Tank;
		EnemyTank.prototype._parent = Tank.prototype;

		EnemyTank.prototype.update = function(opts) {
			this._parent.update.call(this, opts);
		};

		EnemyTank.prototype.kill = function() {
			this._parent.kill.call(this);
		};

		return EnemyTank;
	});