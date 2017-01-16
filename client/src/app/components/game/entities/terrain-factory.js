angular
	.module('app.components.game.entities')
	.factory('TerrainFactory', function(Stone, Grass, Water, Platform, Brick) {

		function TerrainFactory(game, group) {
			this.game = game;
			this.group = group;
		}

		TerrainFactory.prototype.createTerrain = function(terrainTag, x, y) {
			switch(terrainTag) {
				case 'S':
					return new Stone(this.game, x, y, this.group);
				case 'G':
					return new Grass(this.game, x, y, this.group);
				case 'B':
					return new Brick(this.game, x, y, this.group);
				case 'W':
					return new Water(this.game, x, y, this.group);
				case 'P':
					return new Platform(this.game, x, y, this.group);
				default:
					return null;
			}
		};

		return TerrainFactory;
	});