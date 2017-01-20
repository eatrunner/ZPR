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

			var those = this;
			function startGameCallback(response) {
				if(response.errors)
					$log.warn(response.errors);
				else
					those._runTheGame();
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

			var those = this;
			function getStateCallback(response) {
				if(response.errors) {
					$log.warn(response.errors);
				} else {
					those._tankGame.updateState(response);
				}
			}

			function getStateError(reason) {
				$log.error(reason);
			}

			function getStateEnds() {
				those._updatingState = false;
			}
		}

		PlayState.prototype.update = function() {
			if(!this._gameRunning)
				return;

			if(Date.now() - this._lastUpdateTime > GAME_REFRESH_MS) {
				this._lastUpdateTime = Date.now();
				this._updateState();
			}
		};

		return PlayState;
	});