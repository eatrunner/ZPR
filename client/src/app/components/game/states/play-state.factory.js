angular
  	.module('app.components.game.states')
  	.factory('PlayState', function($http, $q, $log, gameService, Map, BeforePlayScreen) {
  		var FACTOR = 16;
  		var GAME_REFRESH_MS = 1000;

		function PlayState(game, gameId) {
			this.game = game;
			this.gameId = gameId;

			this._gameRunning = false;
			this._lastUpdateTime = 0;

			this.gameInfo = undefined;
			this.playground = undefined;
			this.map = undefined;
			this.updatingMap = false;
		}

		PlayState.prototype.init = function(gameInfo) {
			this.gameInfo = gameInfo;

			this.mapWidth = this.gameInfo.mapSize[0];
			this.mapHeight = this.gameInfo.mapSize[1];
			this.mapRealWidth = this.mapWidth * FACTOR;
			this.mapRealHeight = this.mapHeight * FACTOR; 
		}

		PlayState.prototype.create = function() {
			this.game.stage.backgroundColor = "#808080";

			this._createGameMap();
			this._beforePlayScreen = new BeforePlayScreen(this.game, this.gameInfo);
			this._startTheGame();
		};

		PlayState.prototype._startTheGame = function() {
			gameService
				.startGame()
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
			this._beforePlayScreen.hide();
		};

		PlayState.prototype._createGameMap = function() {
			this.map = new Map(this.game, 
				this.mapWidth, this.mapHeight, this.gameInfo.map);

			// group all together
			this.group = this.game.add.group();
			this.group.add(this.map.group);
			
			this.group.x = this.game.world.width/2 - this.mapRealWidth/2;
			this.group.y = this.game.world.height/2 - this.mapRealHeight/2;
		};

		PlayState.prototype._updateMap = function() {
			if(!this.updatingMap) {
				this.updatingMap = true;

				gameService
					.getMap()
					.then(getMapCallback, getMapError)
					.finally(getMapEnds);
			}

			var those = this;
			function getMapCallback(response) {
				if(response.errors) {
					$log.warn(response.errors);
				} else {
					those.map.update(response.map);
				}
			}

			function getMapError(reason) {
				$log.error(reason);
			}

			function getMapEnds() {
				those.updatingMap = false;
			}
		}

		PlayState.prototype.update = function() {
			if(!this._gameRunning)
				return;

			if(Date.now() - this._lastUpdateTime > GAME_REFRESH_MS) {
				this._lastUpdateTime = Date.now();
				this._updateMap();
			}
		};

		return PlayState;
	});