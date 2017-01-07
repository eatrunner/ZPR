angular
	.module('app.game')
	.directive('game', function() {

		var linkFn = function(scope, ele, attrs) {
			var game = new Phaser.Game(400, 256, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update });
			var player;
			var speed = 400;
			var cursor;

			function preload() {
				game.load.spritesheet('terrain2x2', 'img/terrain2x2.png', 16, 16);
				game.load.spritesheet('terrain1x1', 'img/terrain1x1.png', 8, 8);
				game.load.spritesheet('falcon', 'img/falcon.png', 16, 16);
				game.load.spritesheet('create-anim', 'img/create-anim.png', 16, 16);
				game.load.spritesheet('tank-yellow', 'img/tank-yellow.png', 16, 16);
			}

			function create() {
				game.physics.startSystem(Phaser.Physics.ARCADE);
				// game.add.sprite(0,0, 'terrain2x2', 0);
				// game.add.sprite(0,16, 'terrain2x2', 0);

				player = game.add.sprite(0, 0, 'tank-yellow', 0);
				game.physics.arcade.enable(player);
				player.body.collideWorldBounds = true;

				cursor = game.input.keyboard.createCursorKeys();
				console.log(player);
			}

			var lastTimeX = Date.now();
			var lastTimeY = Date.now();
			function update() {
				var newY = player.body.y;
				var newX = player.body.x;
				if(cursor.up.isDown) {
					newY -= 8;
				} else if(cursor.down.isDown) {
					newY += 8;
				}

				if(cursor.left.isDown) {
					newX -= 8;
				} else if(cursor.right.isDown) {
					newX += 8;
				}

				var now = Date.now();
				if(now - lastTimeY >= 50) {
					player.body.y = newY;
					lastTimeY = now;
				}
				if(now - lastTimeX >= 50) {
					player.body.x = newX;
					lastTimeX = now;
				}
			}
		};

		return {
			template: '<div id="game-canvas"></div>',
			compile: function(iEle, iAttrs) {
				return linkFn;
			}
		};
	});