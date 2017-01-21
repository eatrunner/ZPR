angular
	.module('app.components.game.entities')
	.factory('Bullet', function(TanksFactory) {
		var GAME_FPS = 1;
		var FACTOR = 16;

		function Bullet(game, bulletData) {
			this._game = game;
			this.sprite = game.add.sprite(
				FACTOR * bulletData.x, 
				FACTOR * bulletData.y,
				'bullet');

			this._x = bulletData.x;
			this._y = bulletData.y;

			var fx = this._game.add.audio('fire');
			fx.allowMultiple = true;
			fx.play();
		}

		Bullet.prototype.update = function(bulletData) {
			var xChanged = (this._x != bulletData.x);
			var yChanged = (this._y != bulletData.y);
			var posChanged = xChanged || yChanged;
			if(posChanged)
				this._moveBullet(bulletData.x, bulletData.y);
		};

		Bullet.prototype._moveBullet = function(x, y) {
			var TWEEN_DURATION = 1000 / GAME_FPS;

			// anchor is positioned at top left
			var newPosition = {
				x: x * FACTOR, 
				y: y * FACTOR
			};
			var moveTween = this._game.add
				.tween(this.sprite)
				.to(newPosition,
					TWEEN_DURATION,
					Phaser.Easing.Linear.None, 
					true);
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