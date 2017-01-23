angular
	.module('app.components.game.entities')
	.factory('GameState', function(gameService) {

		function GameState() {
			this.onUpdate = new Phaser.Signal();
		}

		GameState.prototype.onUpdate = null;

		GameState.Statuses = {
			RUN: 'run',
			STOP: 'stop',
			PAUSE: 'pause',
			WIN: 'win',
			LOSE: 'lose'
		};

		GameState.prototype.update = function() {
			gameService
				.getState()
				.then(getStateCallback, getStateError);

			var self = this;
			function getStateCallback(response) {
				if(response.errors) {
					$log.warn(response.errors);
					return;
				}
				
				delete response.errors;
				self.onUpdate.dispatch(response);
			}

			function getStateError(reason) {
				$log.error(reason);
			}
		};

		return GameState;
	});