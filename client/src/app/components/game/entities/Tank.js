angular
	.module('app.components.game.entities')
	.factory('Tank', function($log) {
		var FACTOR = 16;
		var GAME_FPS = 1;

		function Tank(game, spriteName, opts) {
			this.game = game;
			
			this.sprite = game.add.sprite(
				FACTOR * opts.x + FACTOR/2, FACTOR * opts.y + FACTOR/2,
				spriteName);

			this.sprite.anchor.setTo(0.5, 0.5);
			this.sprite.animations.add('move', null, 10, true);
			this._x = opts.x;
			this._y = opts.y;

			this._setDirection(opts.direction);
		}

		Tank.prototype.game = null;
		Tank.prototype.sprite = null;
		Tank.prototype._direction = null;
		Tank.prototype._x = null;
		Tank.prototype._y = null;

		Tank.prototype.Direction = Object.freeze({
			UP: 'up',
			DOWN: 'down',
			RIGHT: 'right',
			LEFT: 'left'
		});

		Tank.prototype.kill = function() {
			this.sprite.loadTexture('destroy-anim-small');
			this.sprite.animations.add('destroy', null, 10, true);
			this.sprite.animations.play('destroy');

			var tankDestroyAudio = this.game.add.audio('tank-destroy');
			tankDestroyAudio.play();

			var DESTROY_DURATION = 1000;
			this.sprite.lifespan = DESTROY_DURATION;
		};

		Tank.prototype.update = function(opts) {
			// check, if coordinates has changed
			var xChanged = (this._x != opts.x);
			var yChanged = (this._y != opts.y);
			var posChanged = xChanged || yChanged;
			var directionChanged = (this._direction != opts.direction);

			if(posChanged && directionChanged)
				this._moveTankWithRotation(opts.x, opts.y, opts.direction);
			else if(posChanged)
				this._moveTank(opts.x, opts.y);

			// may occur situation, when only direction changes? 
			
		};

		Tank.prototype._setDirection = function(direction) {
			this.sprite.angle = this._directionToAngle(direction);
			this._direction = direction;
		};

		Tank.prototype._directionToAngle = function(direction) {
			var angle;
			// sprite should be positioned into UP direction
			switch(direction) {
				case this.Direction.UP: 
					angle = 0;
					break;
				case this.Direction.RIGHT:
					angle = 90;
					break;
				case this.Direction.DOWN:
					angle = 180;
					break;
				case this.Direction.LEFT:
					angle = -90;
					break;
				default:
					$log.warn('Unsuported direction: ', direction);
					// TODO: throw an exception?
			}

			return angle;
		};

		Tank.prototype._moveTankWithRotation = function(x, y, direction) {
			// 1/2 of time spend on rotating and 1/2 on moving
			var TWEEN_DURATION = (1000 / GAME_FPS) / 2;

			var newAngle = this._directionToAngle(direction);
			var rotateTween = this.game.add
				.tween(this.sprite)
				.to({angle: newAngle},
					TWEEN_DURATION,
					Phaser.Easing.Quadratic.None, 
					true);

			var newPosition = {
				x: x * FACTOR + FACTOR/2,
				y: y * FACTOR + FACTOR/2
			};
			var moveTween = this.game.add
				.tween(this.sprite)
				.to(newPosition,
					TWEEN_DURATION,
					Phaser.Easing.Quadratic.Out, 
					false);

			rotateTween.chain(moveTween);			

			moveTween.onComplete.add(this._moveTankComplete, this);
			this.sprite.animations.play('move');
			this._direction = direction;
		};

		Tank.prototype._moveTank = function(x, y) {
			// whole time between frames reserved for moving
			var TWEEN_DURATION = 1000 / GAME_FPS;
			var moveTween = this.game.add
				.tween(this.sprite)
				.to({ x: x * FACTOR, y: y * FACTOR },
					TWEEN_DURATION,
					Phaser.Easing.Quadratic.Out, 
					true);
			moveTween.onComplete.add(this._moveTankComplete, this);

			this.sprite.animations.play('move');
		};

		Tank.prototype._moveTankComplete = function(x, y) {
			this.sprite.animations.stop('move');
		};

		return Tank;
	});