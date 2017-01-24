angular
	.module('components.game')
	.factory('Stone', function() {

		function Stone(game, x, y, group) {
			this.sprite = game.add.sprite(x, y, 'stone', null, group);
		}

		return Stone;
	});