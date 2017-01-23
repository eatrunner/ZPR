angular
	.module('app.components.game.entities')
	.factory('BeginMenu', function(GameState, gameService, $log) {

		function BeginMenu(game, gameInfo, gameState) {
			this._game = game;
			this._gameState = gameState;
			this.group = game.add.group();

			this._createBeginScreen(gameInfo.mapId);
			this._createDeactivateTween();
    		this._startGameKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			this._startGameKey.onDown.add(this._startGameKeyPressed, this);

    		game.world.bringToTop(this.group);
			gameState.onUpdate.add(this._update, this);
		}

		BeginMenu.prototype._game = null;
		BeginMenu.prototype._deactivateTween = null;

		BeginMenu.prototype._update = function(gameStateData) {
			if(gameStateData.status !== GameState.Statuses.STOP) {
				this._gameState.onUpdate.remove(this._update, this);
				this._deactivate();
			}
		};

		BeginMenu.prototype._deactivate = function() {
			this._startGameKey.onDown.remove(this._startGameKeyPressed, this);
			this._deactivateTween.start();
			var startGameAudio = this._game.add.audio('start-game');
			startGameAudio.play();
		};

		BeginMenu.prototype._startGameKeyPressed = function() {
			gameService.startGame()
				.then(startGameCallback, startGameError);

			var self = this;
			function startGameCallback(response) {
				if(response.error)
					$log.error(response.error);
			}

			function startGameError(reason) {
				$log.error(reason);
			}
		};
		
		BeginMenu.prototype._createBeginScreen = function(mapId) {
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
				font: '32px Press Start 2P',
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

		BeginMenu.prototype._createDeactivateTween = function() {
			var tweenProps = { 
				height: 0, 
				width: 0, 
				x: this._game.world.width/2, 
				y: this._game.world.height/2 
			};

			this._deactivateTween = this._game.add.tween(this.group)
				.to(tweenProps, 250, Phaser.Easing.Linear.None, false, 1000);
		};

		return BeginMenu;
	});