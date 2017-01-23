angular
	.module('app.components.game.entities')
	.factory('Vest', function(Bonus) {

		Vest.prototype = Object.create(Bonus.prototype);
		Vest.prototype.constructor = Vest;
		Vest.prototype._itemParent = Bonus.prototype;
		function Vest(game, spriteName, opts) {
			Bonus.call(this, game, 'armor', opts);
		}

		return Vest;
	});