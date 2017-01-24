angular
  	.module('components.game')
  	.factory('Map', function(TerrainFactory, GAME_EVENTS) {
  		var FACTOR = 16;

		function Map(game, gameInfo, scope) {
			this.game = game;
			this._mapWidth = gameInfo.mapWidth;
			this._mapHeight = gameInfo.mapHeight;

			this._deregListener = scope.$on(GAME_EVENTS.MAP_UPDATE, 
				this._updateCallback.bind(this));

			this.group = game.add.group();

			this._terrainMap = [];
			this._terrainTags = [];
			this.terrainFactory = new TerrainFactory(game, this.group);

			this._createGroundSprite();
			this._createMapContent(gameInfo.map);
		}

		Map.prototype._createGroundSprite = function() {
			var playgroundBmd = this.game.add.bitmapData();
			playgroundBmd.ctx.beginPath();
			playgroundBmd.ctx.rect(0, 0, 
				this._mapWidth * FACTOR, this._mapHeight * FACTOR);
			playgroundBmd.ctx.fillStyle = '#000';
			playgroundBmd.ctx.fill();

			var playgroundSprite = this.game.add.sprite(
				0, 0,
				playgroundBmd);

			this.group.add(playgroundSprite);
		};

		Map.prototype._createMapContent = function(content) {
			var posY = 0;
			var index = 0;
			for(var i = 0; i < this._mapHeight; ++i) {
				var posX = 0;

				for(var j = 0; j < this._mapWidth; ++j) {
					var terrainTag = content[index++];
					this._terrainTags.push(terrainTag);

					var terrain = this.terrainFactory.createTerrain(
						terrainTag, posX, posY);
					this._terrainMap.push(terrain);

					posX += FACTOR;
				}

				posY += FACTOR;
			}
		};

		Map.prototype.kill = function() {
			this._deregListener();
		};

		Map.prototype._updateCallback = function(event, newMap) {
			var index = 0;
			for(var i = 0; i < this._mapHeight; ++i) {
				for(var j = 0; j < this._mapWidth; ++j, ++index) {
					if(this._terrainTags[index] !== newMap[index]) {
						if(this._terrainMap[index] !== null) {
							this._terrainMap[index].sprite.destroy();
						}

						var newTerrain = this.terrainFactory.createTerrain(newMap[index],
							j*FACTOR, i*FACTOR);
						this._terrainMap[index] = newTerrain;
						this._terrainTags[index] = newMap[index];
					}
				}
			}
		};

		return Map;
	});