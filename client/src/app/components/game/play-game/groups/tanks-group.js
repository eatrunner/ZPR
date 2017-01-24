angular
	.module('components.game')
	.factory('TanksGroup', function(TanksFactory, ItemsGroup, GAME_EVENTS) {

		TanksGroup.prototype = Object.create(ItemsGroup.prototype);
		TanksGroup.prototype.constructor = TanksGroup;
		TanksGroup.prototype._parent = ItemsGroup.prototype;

		function TanksGroup(game, gameInfo, scope) {
			ItemsGroup.call(this, game, new TanksFactory(game));
			this._deregListener = scope.$on(GAME_EVENTS.TANKS_UPDATE, 
				this._updateCallback.bind(this));
		}

		TanksGroup.prototype._updateCallback = function(event, tanksData) {
			this._parent.update.call(this, tanksData);
		};

		TanksGroup.prototype.kill = function() {
			this._deregListener();
		};
	
		return TanksGroup;
	});