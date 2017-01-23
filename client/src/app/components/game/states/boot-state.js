angular
  	.module('app.components.game.states')
  	.factory('BootState', function() {
		function BootState(game) {
			this.game = game;
		}

		BootState.prototype.init = function() {
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.scale.pageAlignHorizontally = true;
			this.game.scale.pageAlignVeritcally = true;
			this.game.scale.refresh();
		};
		
		BootState.prototype.create = function() {
			showLoader(this.game);
			loadAssets(this.game);
			configureGame(this.game);
		};
		
		function configureGame(game) {
			game.physics.startSystem(Phaser.Physics.ARCADE);
		}

		function showLoader(game) {
			game.stage.backgroundColor = "#808080";

			var labelOpts = {
				font: '14px Press Start 2P',
				fill: '#000',
				align: 'center'
			};
			var label = game.add.text(
				game.world.width / 2, 
				game.world.height / 2, 
				'GAME IS BOOTING', 
				labelOpts);
			label.anchor.setTo(0.5, 0.5);
			label.alpha = 0;
			game.add.tween(label).to( 
				{ alpha: 1 }, 
				1000, 
				Phaser.Easing.Linear.None, 
				true, 0, 500, true);
		}

		function loadAssets(game) {
			game.load.onLoadComplete.add(loadComplete, this);

			game.load.spritesheet('bound', 'img/bound16x16.png', 16, 16);
			
			game.load.spritesheet('brick', 'img/brick16x16.png', 16, 16);
			game.load.spritesheet('stone', 'img/stone16x16.png', 16, 16);
			game.load.spritesheet('water', 'img/water16x16.png', 16, 16);
			game.load.spritesheet('platform', 'img/platform16x16.png', 16, 16);
			game.load.spritesheet('grass', 'img/grass16x16.png', 16, 16);
			game.load.spritesheet('empty', 'img/empty16x16.png', 16, 16);

			game.load.spritesheet('falcon', 'img/falcon.png', 16, 16);
			game.load.spritesheet('create-anim', 'img/create-anim.png', 16, 16);

			game.load.spritesheet('player1', 'img/player1.png', 16, 16);
			game.load.spritesheet('player2', 'img/player2.png', 16, 16);
			game.load.spritesheet('player3', 'img/player3.png', 16, 16);
			game.load.spritesheet('player4', 'img/player3.png', 16, 16);

			game.load.spritesheet('enemy1', 'img/enemy1.png', 16, 16);
			game.load.spritesheet('enemy2', 'img/enemy2.png', 16, 16);
			game.load.spritesheet('enemy3', 'img/enemy3.png', 16, 16);
			game.load.spritesheet('enemy4', 'img/enemy3.png', 16, 16);

			game.load.spritesheet('bullet', 'img/bullet.png', 16, 16);

			game.load.spritesheet('weapon', 'img/weapon.png', 16, 16);
			game.load.spritesheet('vest', 'img/vest.png', 16, 16);

			game.load.spritesheet('tank-powerup-anim', 'img/tank-powerup-anim.png', 16, 16);
			game.load.spritesheet('points-hundrets', 'img/points-hundrets.png', 16, 16);
			game.load.spritesheet('destroy-anim-big', 'img/destroy-anim-big.png', 32, 32);
			game.load.spritesheet('destroy-anim-small', 'img/destroy-anim-small.png', 16, 16);

			game.load.audio('tank-wait', 'sfx/tank-wait.mp3');
			game.load.audio('tank-move', 'sfx/tank-move.mp3');
			game.load.audio('new-highscore', 'sfx/new-highscore.mp3');
			game.load.audio('start-game', 'sfx/start-game.mp3');
			game.load.audio('fire', 'sfx/fire.mp3');
			game.load.audio('new-bonus', 'sfx/new-bonus.mp3');
			game.load.audio('get-bonus', 'sfx/get-bonus.mp3');
			game.load.audio('menu-move', 'sfx/menu-move.mp3');
			game.load.audio('tank-destroy', 'sfx/tank-destroy.mp3');
			game.load.audio('bullet-damage', 'sfx/bullet-damage.mp3');
			game.load.audio('pause', 'sfx/pause.mp3');
			
			game.load.start();

			function loadComplete() {
				game.state.start('load');
			}
		}

		return BootState;
	});