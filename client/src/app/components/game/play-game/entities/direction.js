angular
	.module('components.game')
	.factory('Direction', function($log) {
		function Direction() {}

		Direction.Types = Object.freeze({
			UP: 'up',
			DOWN: 'down',
			RIGHT: 'right',
			LEFT: 'left'
		});

		Direction.toAngle = function(direction) {
			var angle;
			// sprite should be positioned into UP direction
			switch(direction) {
				case Direction.Types.UP: 
					angle = 0;
					break;
				case Direction.Types.RIGHT:
					angle = 90;
					break;
				case Direction.Types.DOWN:
					angle = 180;
					break;
				case Direction.Types.LEFT:
					angle = -90;
					break;
				default:
					$log.warn('Unsuported direction: ', direction);
					// TODO: throw an exception?
			}

			return angle;
		};

		return Direction;
	});