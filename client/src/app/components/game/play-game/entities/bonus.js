angular
	.module('app.components.game')
	.factory('Bonus', function(Item) {

		Bonus.prototype = Object.create(Item.prototype);
		Bonus.prototype.constructor = Bonus;
		Bonus.prototype._itemParent = Item.prototype;
		function Bonus(game, spriteName, opts) {
			Item.call(this, game, spriteName, opts.x, opts.y, opts.id);
		}

		return Bonus;
	});