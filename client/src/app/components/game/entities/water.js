angular
	.module('app.components.game.entities')
	.factory('Water', function() {

		function Water(game, x, y, group) {
			this.sprite = game.add.sprite(x, y, 'water', null, group);
		}

		return Water;
	});