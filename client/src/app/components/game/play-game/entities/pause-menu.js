angular
	.module('app.components.game')
	.factory('PauseMenu', function(GameState, GameService) {

		function PauseMenu(game, gameInfo, gameState) {
			this.group = game.add.group();

			gameState.onUpdate.add(this._update, this);

			this._game = game;
			this._paused = false;
			this._createPauseMenu();
			this.group.visible = false;

    		this._escapeKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    		this._escapeKey.onDown.add(this._escapePressed, this);
    		this._pauseAudio = game.add.audio('pause');
		}

		PauseMenu.prototype._update = function(gameStateData) {
			if(gameStateData.status === GameState.Statuses.PAUSE) {
				if(!this._paused)
					this._showPauseMenu();
				this._paused = true;
			} else {
				if(this._paused)
					this._hidePauseMenu();
				this._paused = false;
			}
		};

		PauseMenu.prototype._escapePressed = function() {
			if(this._paused)
				this._resumeGame();
			else
				this._pauseGame();
		};

		PauseMenu.prototype._pauseGame = function() {
			GameService
				.pauseGame()
				.then(pauseGameCallback, pauseGameError);

			var self = this;
			function pauseGameCallback(response) {
				if(response.error)
					$log.warn(response.error);
			}

			function pauseGameError(reason) {
				$log.error(reason);
			}
		};

		PauseMenu.prototype._resumeGame = function() {
			GameService
				.resumeGame()
				.then(resumeGameCallback, resumeGameError);

			var self = this;
			function resumeGameCallback(response) {
				if(response.error)
					$log.warn(response.error);
			}

			function resumeGameError(reason) {
				$log.error(reason);
			}
		};

		PauseMenu.prototype._createPauseMenu = function() {
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
				fill: '#ff0000',
				align: 'center'
			};

			var label = this._game.add.text(
				this._game.world.width / 2, 
				this._game.world.height / 2, 
				'GAME PAUSED', 
				labelOpts,
				this.group);
			label.anchor.setTo(0.5, 0.5);
		};

		PauseMenu.prototype._showPauseMenu = function() {
			this.group.visible = true;
			this._pauseAudio.play();
		};

		PauseMenu.prototype._hidePauseMenu = function() {
			this.group.visible = false;
			this._pauseAudio.play();
		};

		return PauseMenu;
	});