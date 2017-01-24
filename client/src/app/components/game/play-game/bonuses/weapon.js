angular
	.module('components.game')
	.factory('Weapon', function(Bonus) {

		Weapon.prototype = Object.create(Bonus.prototype);
		Weapon.prototype.constructor = Weapon;
		Weapon.prototype._itemParent = Bonus.prototype;
		function Weapon(game, opts) {
			Bonus.call(this, game, 'weapon', opts);
		}

		return Weapon;
	});