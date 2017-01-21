angular
	.module('app.components.game.entities')
	.factory('BulletsGroup', function(Bullet) {
		function BulletsGroup(game) {
			this.group = game.add.group();

			this._game = game;
			this._bulletsMap = {};
		}

		BulletsGroup.prototype.update = function(bulletsData) {
			var oldBulletsMap = this._bulletsMap;
			this._bulletsMap = {};

			for(var i in bulletsData) {
				var bulletData = bulletsData[i];
				var id = bulletData.id;

				var bullet = oldBulletsMap[id];
				var wasBullet = (bullet !== undefined)
				if(wasBullet) {
					bullet.update(bulletData);

					delete oldBulletsMap[id];
					this._bulletsMap[id] = bullet;
				} else {
					bullet = new Bullet(this._game, bulletData);
					this._bulletsMap[id] = bullet;
					this.group.add(bullet.sprite);
				}
			}

			for(var id in oldBulletsMap) {			
			    var bullet = oldBulletsMap[id];
			    bullet.kill();
			}
		}

		return BulletsGroup;
	});