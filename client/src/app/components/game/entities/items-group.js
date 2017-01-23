angular
	.module('app.components.game.entities')
	.factory('ItemsGroup', function() {
		function ItemsGroup(game, itemFactory) {
			this.group = game.add.group();
			this._itemFactory = itemFactory;
			this._itemsMap = {};
		}

		ItemsGroup.prototype.update = function(itemsDataArray) {
			var itemsDataMap = {};
			for(var i in itemsDataArray) {
				var itemData = itemsDataArray[i];
				itemsDataMap[itemData.id] = itemData;
			}

			// look for alive items and update them, or - if not alive - kill them
			for(var id in this._itemsMap) {
				var item = this._itemsMap[id];
				var itemStillAlive = itemsDataMap.hasOwnProperty(id);
				if(itemStillAlive) {
					item.update(itemsDataMap[id]);
					delete itemsDataMap[id];
				} else {
					item.kill();
					delete this._itemsMap[id];
				}
			}

			// rest from itemsDataMap have to be created
			for(var id in itemsDataMap) {
				var itemData = itemsDataMap[id];
				var item = this._itemFactory.create(itemData);
				this._itemsMap[id] = item;
				this.group.add(item.sprite);
			}
		};

		return ItemsGroup;
	});