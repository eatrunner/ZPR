angular
	.module('components.game')
	.factory('Brick', function() {

		function Brick(game, x, y, group) {
			this.sprite = game.add.sprite(x, y, 'brick', null, group);
		}

		return Brick;
	});