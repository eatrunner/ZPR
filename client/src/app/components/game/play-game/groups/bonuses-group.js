angular
	.module('components.game')
	.factory('BonusesGroup', function(ItemsGroup, BonusesFactory, GAME_EVENTS) {

		BonusesGroup.prototype = Object.create(ItemsGroup.prototype);
		BonusesGroup.prototype.constructor = BonusesGroup;
		BonusesGroup.prototype._parent = ItemsGroup.prototype;

		function BonusesGroup(game, gameInfo, scope) {
			ItemsGroup.call(this, game, new BonusesFactory(game));
			this._deregListener = scope.$on(GAME_EVENTS.BONUSES_UPDATE, 
				this._updateCallback.bind(this));
		}

		BonusesGroup.prototype._updateCallback = function(event, bonusesData) {
			this._parent.update.call(this, bonusesData);
		};

		BonusesGroup.prototype.kill = function() {
			this._deregListener();
		};

		return BonusesGroup;
	});