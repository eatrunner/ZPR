angular
	.module('app.components.game.entities')
	.factory('Brick', function() {

		function Brick(game, x, y, group) {
			this.sprite = game.add.sprite(x, y, 'brick', null, group);
		}

		return Brick;
	});