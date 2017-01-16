angular
	.module('app.components.game.entities')
	.factory('Grass', function() {

		function Grass(game, x, y, group) {
			this.sprite = game.add.sprite(x, y, 'grass', null, group);
		}

		return Grass;
	});