angular
	.module('app.components.game.entities')
	.factory('Rotatable', function($q, Directionable) {
		var FACTOR = 16;
		var GAME_FPS = 1;

		// it must be directionable!
		Rotatable.prototype = Object.create(Directionable.prototype);
		Rotatable.prototype.constructor = Rotatable;
		Rotatable.prototype._directionableParent = Directionable.prototype;

		function Rotatable(game, sprite, direction) {
			Directionable.call(this, sprite, direction);

			this._sprite = sprite;
			this._game = game;
		}

		Rotatable.prototype._sprite = null;
		Rotatable.prototype._game = null;

		Rotatable.prototype.rotate = function(direction, rotateDuration) {
			var newAngle = Directionable.directionToAngle(direction);
			var rotateTween = this._game.add.tween(this._sprite)
				.to({angle: newAngle},
					rotateDuration,
					Phaser.Easing.Quadratic.None, 
					true);

			rotateTween.onComplete.addOnce(
				Rotatable.prototype._rotateCompleteCallback, 
				this,
				null, 
				direction);
			return rotateTween.onComplete;
		};

		Rotatable.prototype._rotateCompleteCallback = function(Sprite, Tween, direction) {
			Directionable.prototype.setDirection.call(this, direction);
		};

		return Rotatable;
	});