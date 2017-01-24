angular
	.module('components.game')
	.factory('Bullet', function(Item, Direction) {
		var GAME_FPS = 1;
		var FACTOR = 16;

		Bullet.prototype = Object.create(Item.prototype);
		Bullet.prototype.constructor = Bullet;
		Bullet.prototype._itemParent = Item.prototype;

		function Bullet(game, opts) {
			Item.call(this, game, 'bullet', opts.x, opts.y, opts.id);
			this._game = game;

			this._setPosition(opts.x, opts.y);
			this._setDirection(opts.dir);

			var fx = this._game.add.audio('fire');
			fx.allowMultiple = true;
			fx.play();
		}

		Bullet.prototype.update = function(opts) {
			var xChanged = (this._x != opts.x);
			var yChanged = (this._y != opts.y);
			var posChanged = xChanged || yChanged;
			if(posChanged) {
				var moveDuration = 1000;
				this._move.call(this, 
					opts.x, opts.y, moveDuration);
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

		Bullet.prototype._setPosition = function(x, y) {
			this._x = x;
			this._y = y;
			this.sprite.x = FACTOR * x + FACTOR/2;
			this.sprite.y = FACTOR * y + FACTOR/2;
		};

		Bullet.prototype._setDirection = function(dir) {
			this._dir = dir;
			this.sprite.angle = Direction.toAngle(dir);
		};

		Bullet.prototype._move = function(x, y, duration) {
			var newPosition = {
				x: x * FACTOR + FACTOR/2,
				y: y * FACTOR + FACTOR/2
			};
			var moveEngine = Phaser.Easing.Linear.None;
			var hasToStartMoving = true;
			var moveTween = this._game.add
				.tween(this.sprite)
				.to(newPosition, duration, 
					moveEngine, hasToStartMoving);

			moveTween.onComplete.addOnce(this._moveCompleteCallback, this, null, x, y);

			return moveTween.onComplete;
		};

		Bullet.prototype._moveCompleteCallback = function(sprite, tween, x, y) {
			this._setPosition(x, y);
		};

		return Bullet;
	});