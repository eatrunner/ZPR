angular
	.module('components.game')
	.factory('Platform', function() {

		function Platform(game, x, y, group) {
			this.sprite = game.add.sprite(x, y, 'platform', null, group);
		}

		return Platform;
	});