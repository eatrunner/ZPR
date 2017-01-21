angular
	.module('app.components.game.entities')
	.factory('Directionable', function($log) {
		var FACTOR = 16;
		var GAME_FPS = 1;

		function Directionable(sprite, direction) {
			this._sprite = sprite;

			Directionable.prototype.setDirection.call(this, direction);
		}

		Directionable.prototype._sprite = null;

		Directionable.prototype.setDirection = function(direction) {
			this._sprite.angle = Directionable.directionToAngle(direction);
		};

		Directionable.Direction = Object.freeze({
			UP: 'up',
			DOWN: 'down',
			RIGHT: 'right',
			LEFT: 'left'
		});

		Directionable.directionToAngle = function(direction) {
			var angle;
			// sprite should be positioned into UP direction
			switch(direction) {
				case Directionable.Direction.UP: 
					angle = 0;
					break;
				case Directionable.Direction.RIGHT:
					angle = 90;
					break;
				case Directionable.Direction.DOWN:
					angle = 180;
					break;
				case Directionable.Direction.LEFT:
					angle = -90;
					break;
				default:
					$log.warn('Unsuported direction: ', direction);
					// TODO: throw an exception?
			}

			return angle;
		};



		return Directionable;
	});