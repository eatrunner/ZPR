angular
	.module('components.game')
	.factory('BulletsFactory', function(Bullet) {
		
		function BulletsFactory(game) {
			this._game = game;
		}

		BulletsFactory.prototype.create = function(bulletData) {
			return new Bullet(this._game, bulletData);
		};

		return BulletsFactory;
	});