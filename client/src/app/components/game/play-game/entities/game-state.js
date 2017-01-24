angular
	.module('app.components.game')
	.factory('GameState', function(GameService) {

		function GameState() {
			this.onUpdate = new Phaser.Signal();
			this.status = {};
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
			GameService
				.getState()
				.then(getStateCallback, getStateError);

			var self = this;
			function getStateCallback(response) {
				self.onUpdate.dispatch(response);
				self.status = response;
			}

			function getStateError(reason) {
				$log.error(reason);
			}
		};

		return GameState;
	});