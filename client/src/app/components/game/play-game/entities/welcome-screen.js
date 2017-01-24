angular
	.module('app.components.game')
	.factory('WelcomeScreen', function(GameState, GameService, $log) {

		function WelcomeScreen(game, gameInfo) {
			this._game = game;
			this.group = game.add.group();

			this._createScreen(gameInfo.map_id);
			this._createHideTween();
    		game.world.bringToTop(this.group);
		}

		WelcomeScreen.prototype._game = null;
		WelcomeScreen.prototype._hideTween = null;

		WelcomeScreen.prototype.hide = function() {
			this._hideTween.start();
			var startGameAudio = this._game.add.audio('start-game');
			startGameAudio.play();
		};
		
		WelcomeScreen.prototype._createScreen = function(mapId) {
			var stageNumber = mapId;

			var initScreenBmd = this._game.add.bitmapData(
				this._game.world.width, this._game.world.height);
			initScreenBmd.ctx.beginPath();
			initScreenBmd.ctx.rect(0, 0, 
				this._game.world.width, this._game.world.height);
			initScreenBmd.ctx.fillStyle = '#aaaaaa';
			initScreenBmd.ctx.fill();

			var initScreenSprite = this.group.create(
				0, 0,
				initScreenBmd);

			var labelOpts = {
				font: '20px Press Start 2P',
				fill: '#000',
				align: 'center'
			};

			var label = this._game.add.text(
				this._game.world.width / 2, 
				this._game.world.height / 2, 
				'STAGE #' + stageNumber, 
				labelOpts,
				this.group);

			label.anchor.setTo(0.5, 0.5);
		};

		WelcomeScreen.prototype._createHideTween = function() {
			var tweenProps = { 
				height: 0, 
				width: 0, 
				x: this._game.world.width/2, 
				y: this._game.world.height/2 
			};

			this._hideTween = this._game.add.tween(this.group)
				.to(tweenProps, 250, Phaser.Easing.Linear.None, false, 1000);
		};

		return WelcomeScreen;
	});