angular
  	.module('app.components.game.states')
  	.factory('PlayState', function($http, $q, $log, gameService, TankGame) {
  		var GAME_REFRESH_MS = 1000;

		function PlayState(game, gameId) {
			this._game = game;
			this._gameId = gameId;
			this._gameRunning = false;
			this._lastUpdateTime = 0;
			this._updatingState = false;
			this._gameInfo = {};
		}

		PlayState.prototype.init = function(gameInfo) {
			this._gameInfo = gameInfo;
		}

		PlayState.prototype.create = function() {
			this._tankGame = new TankGame(this._game, this._gameInfo);
			this._startTheGame();
		};

		PlayState.prototype._startTheGame = function() {
			gameService
				.startGame(this._gameId)
				.then(startGameCallback, startGameError);

			var self = this;
			function startGameCallback(response) {
				if(response.errors)
					$log.warn(response.errors);
				else
					self._runTheGame();
			}

			function startGameError(reason) {
				$log.error(reason);
			}
		};

		PlayState.prototype._runTheGame = function() {
			this._gameRunning = true;
			this._tankGame.startGame();
		};

		PlayState.prototype._updateState = function() {
			if(!this._updatingState) {
				this._updatingState = true;

				gameService
					.getState(this._gameId)
					.then(getStateCallback, getStateError)
					.finally(getStateEnds);
			}

			var self = this;
			function getStateCallback(response) {
				if(response.errors) {
					$log.warn(response.errors);
				} else {
					self._tankGame.updateState(response);
				}
			}

			function getStateError(reason) {
				$log.error(reason);
			}

			function getStateEnds() {
				self._updatingState = false;
			}
		}

		PlayState.prototype.update = function() {
			if(!this._gameRunning)
				return;

			var now = Date.now();
			var timeDiff = now - this._lastUpdateTime;
			if(timeDiff > GAME_REFRESH_MS) {
				this._lastUpdateTime = now;
				this._updateState();
			}
		};

		return PlayState;
	});