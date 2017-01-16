angular
  	.module('app.components.game.states')
  	.factory('LoaderState', function() {
		function LoaderState(game, mapW, mapH) {
			this.game = game;
		}

		LoaderState.prototype.create = function() {
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
				'GAME IS LOADING', 
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
			game.load.spritesheet('tank-yellow', 'img/tank-yellow.png', 16, 16);
			game.load.spritesheet('tank-green', 'img/tank-green.png', 16, 16);
			game.load.spritesheet('tank-red', 'img/tank-red.png', 16, 16);
			game.load.spritesheet('tank-white', 'img/tank-white.png', 16, 16);
			game.load.spritesheet('tank-powerup-anim', 'img/tank-powerup-anim.png', 16, 16);
			game.load.spritesheet('points-hundrets', 'img/points-hundrets.png', 16, 16);
			game.load.spritesheet('bonuses', 'img/bonuses.png', 16, 16);
			game.load.spritesheet('destroy-big-anim', 'img/destroy-big-anim.png', 32, 32);
			game.load.spritesheet('destroy-small-anim', 'img/destroy-small-anim.png', 16, 16);

			game.load.audio('tank-wait', 'sfx/tank-wait.mp3');
			game.load.audio('tank-move', 'sfx/tank-move.mp3');
			game.load.audio('new-highscore', 'sfx/new-highscore.mp3');
			game.load.audio('start-game', 'sfx/start-game.mp3');
			game.load.audio('fire', 'sfx/fire.mp3');
			game.load.audio('new-bonus', 'sfx/new-bonus.mp3');
			game.load.audio('get-bonus', 'sfx/get-bonus.mp3');
			game.load.audio('menu-move', 'sfx/menu-move.mp3');

			game.load.start();

			function loadComplete() {
				game.state.start('ready');
			}
		}

		return LoaderState;
	});