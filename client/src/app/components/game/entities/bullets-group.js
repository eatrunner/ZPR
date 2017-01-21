angular
	.module('app.components.game.entities')
	.factory('BulletsGroup', function(Bullet) {
		function BulletsGroup(game) {
			this.group = game.add.group();

			this._game = game;
			this._bulletsMap = {};
		}

		BulletsGroup.prototype.update = function(bulletsData) {
			for(var i in bulletsData) {
				var bulletData = bulletsData[i];
				var id = bulletData.id;
				var bulletsMapContainsId = (this._bulletsMap.hasOwnProperty(id));
				if(bulletsMapContainsId) {
					this._bulletsMap[id].update(bulletData);
				} else {
					var bullet = new Bullet(this._game, bulletData);
					this._bulletsMap[id] = bullet;
					this.group.add(bullet.sprite);
				}
			}
		}

		return BulletsGroup;
	});