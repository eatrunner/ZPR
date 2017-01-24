angular
	.module('components.game')
	.factory('BulletsGroup', function(ItemsGroup, BulletsFactory, GAME_EVENTS) {

		BulletsGroup.prototype = Object.create(ItemsGroup.prototype);
		BulletsGroup.prototype.constructor = BulletsGroup;
		BulletsGroup.prototype._parent = ItemsGroup.prototype;

		function BulletsGroup(game, gameInfo, scope) {
			ItemsGroup.call(this, game, new BulletsFactory(game));
			this._deregListener = scope.$on(GAME_EVENTS.BULLETS_UPDATE, 
				this._updateCallback.bind(this));
		}

		BulletsGroup.prototype._updateCallback = function(event, bulletsData) {
			this._parent.update.call(this, bulletsData);
		};

		BulletsGroup.prototype.kill = function() {
			this._deregListener();
		};

		return BulletsGroup;
	});