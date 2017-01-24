angular
	.module('app.components.game')
	.factory('BulletsGroup', function(ItemsGroup, BulletsFactory) {

		BulletsGroup.prototype = Object.create(ItemsGroup.prototype);
		BulletsGroup.prototype.constructor = BulletsGroup;

		function BulletsGroup(game) {
			ItemsGroup.call(this, game, new BulletsFactory(game));
		}

		return BulletsGroup;
	});