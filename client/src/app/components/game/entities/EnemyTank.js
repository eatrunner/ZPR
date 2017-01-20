angular
	.module('app.components.game.entities')
	.factory('EnemyTank', function(Tank) {

		function EnemyTank(game, group, x, y, direction, colour, level) {
			this.sprite = game.add.sprite(x, y, 'enemy-gray', 0, group);
		}

		EnemyTank.prototype.changeDirection = function(direction) {

		};

		EnemyTank.prototype.changeColour = function(direction) {

		};

		EnemyTank.prototype.changeLevel = function(level) {

		};

		return EnemyTank;
	});