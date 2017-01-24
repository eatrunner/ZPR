angular
  	.module('app.components.game')
  	.factory('BootState', function() {
		function BootState(game) {
			this._game = game;
		}

		BootState.prototype.init = function() {
			this._game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this._game.scale.pageAlignHorizontally = true;
			this._game.scale.pageAlignVeritcally = true;
			this._game.scale.refresh();
		};
		
		BootState.prototype.create = function() {
			this._showLoader();
			this._loadAssets();
			this._configureGame();
		};
		
		BootState.prototype._configureGame = function() {
			this._game.physics.startSystem(Phaser.Physics.ARCADE);
		};

		BootState.prototype._showLoader = function() {
			this._game.stage.backgroundColor = "#808080";

			var labelOpts = {
				font: '14px Press Start 2P',
				fill: '#000',
				align: 'center'
			};
			var label = this._game.add.text(
				this._game.world.width / 2, 
				this._game.world.height / 2, 
				'GAME IS BOOTING', 
				labelOpts);
			label.anchor.setTo(0.5, 0.5);
			label.alpha = 0;
			this._game.add.tween(label).to( 
				{ alpha: 1 }, 
				1000, 
				Phaser.Easing.Linear.None, 
				true, 0, 500, true);
		};

		BootState.prototype._loadAssets = function() {
			this._game.load.onLoadComplete.add(this._loadComplete, this);

			this._game.load.spritesheet('bound', 'img/bound16x16.png', 16, 16);
			
			this._game.load.spritesheet('brick', 'img/brick16x16.png', 16, 16);
			this._game.load.spritesheet('stone', 'img/stone16x16.png', 16, 16);
			this._game.load.spritesheet('water', 'img/water16x16.png', 16, 16);
			this._game.load.spritesheet('platform', 'img/platform16x16.png', 16, 16);
			this._game.load.spritesheet('grass', 'img/grass16x16.png', 16, 16);
			this._game.load.spritesheet('empty', 'img/empty16x16.png', 16, 16);

			this._game.load.spritesheet('falcon', 'img/falcon.png', 16, 16);
			this._game.load.spritesheet('create-anim', 'img/create-anim.png', 16, 16);

			this._game.load.spritesheet('player1', 'img/player1.png', 16, 16);
			this._game.load.spritesheet('player2', 'img/player2.png', 16, 16);
			this._game.load.spritesheet('player3', 'img/player3.png', 16, 16);
			this._game.load.spritesheet('player4', 'img/player3.png', 16, 16);

			this._game.load.spritesheet('enemy1', 'img/enemy1.png', 16, 16);
			this._game.load.spritesheet('enemy2', 'img/enemy2.png', 16, 16);
			this._game.load.spritesheet('enemy3', 'img/enemy3.png', 16, 16);
			this._game.load.spritesheet('enemy4', 'img/enemy3.png', 16, 16);

			this._game.load.spritesheet('bullet', 'img/bullet.png', 16, 16);

			this._game.load.spritesheet('weapon', 'img/weapon.png', 16, 16);
			this._game.load.spritesheet('vest', 'img/vest.png', 16, 16);

			this._game.load.spritesheet('tank-powerup-anim', 'img/tank-powerup-anim.png', 16, 16);
			this._game.load.spritesheet('points-hundrets', 'img/points-hundrets.png', 16, 16);
			this._game.load.spritesheet('destroy-anim-big', 'img/destroy-anim-big.png', 32, 32);
			this._game.load.spritesheet('destroy-anim-small', 'img/destroy-anim-small.png', 16, 16);

			this._game.load.audio('tank-wait', 'sfx/tank-wait.mp3');
			this._game.load.audio('tank-move', 'sfx/tank-move.mp3');
			this._game.load.audio('new-highscore', 'sfx/new-highscore.mp3');
			this._game.load.audio('start-game', 'sfx/start-game.mp3');
			this._game.load.audio('fire', 'sfx/fire.mp3');
			this._game.load.audio('new-bonus', 'sfx/new-bonus.mp3');
			this._game.load.audio('get-bonus', 'sfx/get-bonus.mp3');
			this._game.load.audio('menu-move', 'sfx/menu-move.mp3');
			this._game.load.audio('tank-destroy', 'sfx/tank-destroy.mp3');
			this._game.load.audio('bullet-damage', 'sfx/bullet-damage.mp3');
			this._game.load.audio('pause', 'sfx/pause.mp3');
			
			this._game.load.start();
		};

		BootState.prototype._loadComplete = function() {
			this._game.state.start('load');
		};

		return BootState;
	});