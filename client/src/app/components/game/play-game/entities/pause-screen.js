angular
	.module('components.game')
	.factory('PauseScreen', function(GAME_EVENTS, GAME_STATUSES) {

		function PauseScreen(game, gameInfo, scope) {
			this.group = game.add.group();
			this.group.visible = false;

			this._game = game;
			this._createPauseScreen();

			this._deregStatusListener = scope.$on(GAME_EVENTS.STATUS_UPDATE,
				this._updateCallback.bind(this));

    		this._pauseAudio = game.add.audio('pause');
		}

		PauseScreen.prototype.kill = function() {
			this._deregStatusListener();
		};

		PauseScreen.prototype._updateCallback = function(event, newStatus, oldStatus) {
			if(newStatus === GAME_STATUSES.PAUSE && 
				oldStatus === GAME_STATUSES.RUN)
				this._show();
			else if(newStatus === GAME_STATUSES.RUN &&
				oldStatus === GAME_STATUSES.PAUSE)
				this._hide();
		};

		PauseScreen.prototype._show = function() {
			this.group.visible = true;
			this._pauseAudio.play();
		};

		PauseScreen.prototype._hide = function() {
			this.group.visible = false;
			this._pauseAudio.play();
		};

		PauseScreen.prototype._createPauseScreen = function() {
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

		return PauseScreen;
	});