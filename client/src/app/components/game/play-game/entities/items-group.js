angular
	.module('components.game')
	.factory('ItemsGroup', function() {
		function ItemsGroup(game, itemFactory) {
			this.group = game.add.group();
			this._itemFactory = itemFactory;
			this._itemsMap = {};
		}

		ItemsGroup.prototype.update = function(itemsDataArray) {
			var itemsDataMap = {};
			var itemData;
			for(var i in itemsDataArray) {
				itemData = itemsDataArray[i];
				itemsDataMap[itemData.id] = itemData;
			}

			// look for alive iems and update them, or - if not alive - kill them
			var id, item;
			for(id in this._itemsMap) {
				item = this._itemsMap[id];
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
			for(id in itemsDataMap) {
				itemData = itemsDataMap[id];
				item = this._itemFactory.create(itemData);
				this._itemsMap[id] = item;
				this.group.add(item.sprite);
			}
		};

		return ItemsGroup;
	});