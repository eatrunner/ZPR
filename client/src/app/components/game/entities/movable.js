angular
	.module('app.components.game.entities')
	.factory('Movable', function($q) {
		var FACTOR = 16;
		var GAME_FPS = 1;

		function Movable(game, sprite, x, y) {
			sprite.animations.add('move', null, 10, true);

			this._sprite = sprite;
			this._game = game;
		}

		Movable.prototype._sprite = null;
		Movable.prototype._game = null;

		Movable.prototype.move = function(x, y, moveDuration) {
			// var TWEEN_DURATION = 1000 / GAME_FPS;

			var newPosition = {
				x: x * FACTOR + FACTOR/2,
				y: y * FACTOR + FACTOR/2
			};
			var moveEngine = Phaser.Easing.Linear.None;
			var hasToStartMoving = true;

			var moveTween = this._game.add
				.tween(this._sprite)
				.to(newPosition,
					moveDuration,
					moveEngine, 
					hasToStartMoving);

			this._sprite.animations.play('move');
			moveTween.onComplete.addOnce(
				Movable.prototype._moveCompleteCallback, 
				this,
				null);

			return moveTween.onComplete;
		};

		Movable.prototype._moveCompleteCallback = function(sprite, tween, x, y) {
			this._sprite.animations.stop('move');
		};

		return Movable;
	});