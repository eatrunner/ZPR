angular
	.module('app.components.game.entities')
	.factory('TanksGroup', function(TanksFactory, ItemsGroup) {

		TanksGroup.prototype = Object.create(ItemsGroup.prototype);
		TanksGroup.prototype.constructor = TanksGroup;

		function TanksGroup(game) {
			ItemsGroup.call(this, game, new TanksFactory(game));
		}
	
		return TanksGroup;
	});