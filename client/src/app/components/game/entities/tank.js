angular
	.module('app.components.game.entities')
	.factory('Tank', function($log, Item, Direction) {
		var FACTOR = 16;
		var GAME_FPS = 1;

		Tank.prototype = Object.create(Item.prototype);
		Tank.prototype.constructor = Tank;

		function Tank(game, spriteName, opts) {
			Item.call(this, game, spriteName, opts.x, opts.y, opts.id);
			this._game = game;

			this._setPosition(opts.x, opts.y);
			this._setDirection(opts.dir);

			this._tankDestroyAudio = game.add.audio('tank-destroy');
		}

		Tank.prototype.kill = function() {
			this.sprite.loadTexture('destroy-anim-small');
			this.sprite.animations.add('destroy', null, 10, true);
			this.sprite.animations.play('destroy');

			this._tankDestroyAudio.play();

			var DESTROY_DURATION = 1000;
			this.sprite.lifespan = DESTROY_DURATION;
		};

		Tank.prototype.update = function(opts) {
			//check, if coordinates has changed
			var xChanged = (this._x != opts.x);
			var yChanged = (this._y != opts.y);
			var posChanged = xChanged || yChanged;
			var dirChanged = (this._dir != opts.dir);

			if(posChanged && dirChanged) {
				var rotateDuration = 300;
				var rotateOnComplete = this._rotate(opts.dir, rotateDuration);

				rotateOnComplete.addOnce(this._afterRotateCallback, this, null,
					opts.x, opts.y);
			} else if(posChanged) {
				var onlyMoveDuration = 1000;
				var afterMoveSignal = this._move(opts.x, opts.y, onlyMoveDuration);
			}
		};

		Tank.prototype._setPosition = function(x, y) {
			this._x = x;
			this._y = y;
			this.sprite.x = FACTOR * x + FACTOR/2;
			this.sprite.y = FACTOR * y + FACTOR/2;
		};

		Tank.prototype._setDirection = function(dir) {
			this._dir = dir;
			this.sprite.angle = Direction.toAngle(dir);
		};

		Tank.prototype._afterRotateCallback = function(sprite, tween, x, y) {
			var afterRotateMoveDuration = 700;
			this._move(x, y, afterRotateMoveDuration);
		};

		Tank.prototype._move = function(x, y, duration) {
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

			this.sprite.animations.play('move');
			moveTween.onComplete.addOnce(this._moveCompleteCallback, this, null, x, y);

			return moveTween.onComplete;
		};

		Tank.prototype._moveCompleteCallback = function(sprite, tween, x, y) {
			this.sprite.animations.stop('move');
			this._setPosition(x, y);
		};

		Tank.prototype._rotate = function(dir, duration) {
			var newAngle = {angle: Direction.toAngle(dir)};

			var rotateTween = this._game.add.tween(this.sprite)
				.to(newAngle, duration, 
					Phaser.Easing.Quadratic.None, true);

			rotateTween.onComplete.addOnce(this._rotateCompleteCallback, this,
				null, dir);
			return rotateTween.onComplete;
		};

		Tank.prototype._rotateCompleteCallback = function(Sprite, Tween, dir) {
			this._setDirection(dir);
		};

		return Tank;
	});