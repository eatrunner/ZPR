angular
	.module('app.components.game.entities')
	.factory('Item', function() {
		var FACTOR = 16;
		var GAME_FPS = 1;

		function Item(game, spriteName, x, y, id) {
			this.sprite = game.add.sprite(
				FACTOR * x + FACTOR/2,
				FACTOR * y + FACTOR/2,
				spriteName);

			this.sprite.anchor.setTo(0.5, 0.5);
			this.id = id;
		}

		return Item;
	});