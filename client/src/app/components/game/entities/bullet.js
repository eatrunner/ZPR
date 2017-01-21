angular
	.module('app.components.game.entities')
	.factory('Bullet', function(Item, Movable, Directionable) {
		var GAME_FPS = 1;
		var FACTOR = 16;

		// Bullet is movable, directionable
		Bullet.prototype = Object.create(Item.prototype);
		Bullet.prototype.constructor = Bullet;
		Bullet.prototype._itemParent = Item.prototype;

		angular.extend(Bullet, Movable.prototype);
		Bullet.prototype._movableParent = Movable.prototype;

		angular.extend(Bullet, Directionable.prototype);
		Bullet.prototype._directionableParent = Directionable.prototype;

		function Bullet(game, bulletData) {
			var x = bulletData.x;
			var y = bulletData.y;
			var direction = bulletData.direction;

			Item.call(this, game, 'bullet', x, y);
			Movable.call(this, game, this.sprite, x, y);
			Directionable.call(this, this.sprite, direction);

			var fx = this._game.add.audio('fire');
			fx.allowMultiple = true;
			fx.play();
		}

		Bullet.prototype.update = function(bulletData) {
			var xChanged = (this._x != bulletData.x);
			var yChanged = (this._y != bulletData.y);
			var posChanged = xChanged || yChanged;
			if(posChanged) {
				var moveDuration = 1000;
				this._movableParent.move.call(this, 
					bulletData.x, bulletData.y, moveDuration);
			}
		};

		Bullet.prototype.kill = function() {
			this.sprite.loadTexture('destroy-anim-small');
			this.sprite.animations.add('destroy', null, 10, true);
			this.sprite.animations.play('destroy');

			var tankDestroyAudio = this._game.add.audio('bullet-damage');
			tankDestroyAudio.play();

			var DESTROY_DURATION = 1000;
			this.sprite.lifespan = DESTROY_DURATION;
		};


		return Bullet;
	});