angular
	.module('app.components.game')
	.factory('BonusesGroup', function(ItemsGroup, BonusesFactory) {

		BonusesGroup.prototype = Object.create(ItemsGroup.prototype);
		BonusesGroup.prototype.constructor = BonusesGroup;

		function BonusesGroup(game) {
			ItemsGroup.call(this, game, new BonusesFactory(game));
		}

		return BonusesGroup;
	});