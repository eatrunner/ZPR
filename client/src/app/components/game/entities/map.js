angular
  	.module('app.components.game.entities')
  	.factory('Map', function(TerrainFactory) {
  		var FACTOR = 16;

		function Map(game, mapWidth, mapHeight, content) {
			this.game = game;
			this.mapWidth = mapWidth;
			this.mapHeight = mapHeight;

			this.group = game.add.group();

			this.terrainMap = [];
			this.terrainTags = [];
			this.terrainFactory = new TerrainFactory(game, this.group);

			var playgroundBmd = this.game.add.bitmapData();
			playgroundBmd.ctx.beginPath();
			playgroundBmd.ctx.rect(0, 0, 
				mapWidth * FACTOR, mapHeight * FACTOR);
			playgroundBmd.ctx.fillStyle = '#000';
			playgroundBmd.ctx.fill();

			var playgroundSprite = this.game.add.sprite(
				0, 0,
				playgroundBmd);

			this.group.add(playgroundSprite);

			var posY = 0;
			var index = 0;
			for(var i = 0; i < mapHeight; ++i) {
				var posX = 0;
				for(var j = 0; j < mapWidth; ++j) {
					var terrainTag = content[index++];
					this.terrainTags.push(terrainTag);
					this.terrainMap.push(this.terrainFactory.createTerrain(
						terrainTag, posX, posY));
					posX += FACTOR;
				}
				posY += FACTOR;
			}
		}

		Map.prototype.update = function(newMap) {
			var index = 0;
			for(var i = 0; i < this.mapHeight; ++i) {
				for(var j = 0; j < this.mapWidth; ++j, ++index) {
					if(this.terrainTags[index] !== newMap[index]) {
						if(this.terrainMap[index] !== null) 
							this.terrainMap[index].sprite.destroy();
						this.terrainMap[index] = this.terrainFactory.createTerrain(
							newMap[index],
							j*FACTOR, i*FACTOR);
						this.terrainTags[index] = newMap[index];
					}
				}
			}
		};

		return Map;
	});