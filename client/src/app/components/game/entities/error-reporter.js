angular
	.module('app.components.game.entities')
	.factory('ErrorReporter', function($log) {

		function ErrorReporter(game) {
			this._game = game;
		}

		ErrorReporter.prototype.error = function(reason) {
			$log.error(reason);
			alert('Error occured!');
			this._game.paused = true;
		};

		return ErrorReporter;
	});