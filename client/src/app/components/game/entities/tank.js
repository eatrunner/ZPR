angular
	.module('app.components.game.entities')
	.factory('Tank', function($log, Item, Movable, Rotatable) {
		var FACTOR = 16;
		var GAME_FPS = 1;

		Tank.prototype = Object.create(Item.prototype);
		Tank.prototype.constructor = Tank;
		Tank.prototype._itemParent = Item.prototype;

		angular.extend(Tank, Movable.prototype);
		Tank.prototype._movableParent = Movable.prototype;

		angular.extend(Tank, Rotatable.prototype);
		Tank.prototype._rotatableParent = Rotatable.prototype;

		// a Tank is: Item, Rotatable(Directionable) and Movable
		function Tank(game, spriteName, opts) {
			var x = opts.x;
			var y = opts.y;
			var direction = opts.direction;

			Item.call(this, game, spriteName, x, y, opts.id);
			Movable.call(this, game, this.sprite, x, y);
			Rotatable.call(this, game, this.sprite, direction);

			this._tankDestroyAudio = game.add.audio('tank-destroy');
		}

		Tank.prototype._sprite = null;

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
			var directionChanged = (this._direction != opts.direction);

			if(posChanged && directionChanged) {
				var rotateDuration = 300;
				var afterRotateSignal = this._rotatableParent.rotate.call(this, 
					opts.direction, rotateDuration);

				afterRotateSignal.addOnce(
					Tank.prototype.afterRotateCallback, 
					this, 
					null,
					opts.x, opts.y);

			} else if(posChanged) {
				var onlyMoveDuration = 1000;
				var afterMoveSignal = this._movableParent.move.call(this, 
					opts.x, opts.y, onlyMoveDuration);
			}
		};

		Tank.prototype.afterRotateCallback = function(sprite, tween, x, y, t) {
			var afterRotateMoveDuration = 700;
			this._movableParent.move.call(this, 
				x, y, afterRotateMoveDuration);
		};

		return Tank;
	});