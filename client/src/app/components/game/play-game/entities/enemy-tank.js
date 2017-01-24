angular
	.module('app.components.game')
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

		return EnemyTank;
	});