angular
  	.module('components.game')
  	.factory('WinState', function($http, $q, GameService, $log, $state) {
		function WinState(game) {
			this._game = game;
		}

		WinState.prototype.init = function(gameInfo) {
			this._gameInfo = gameInfo;
		};
 
		WinState.prototype.create = function() {
			this._showWinScreen();
    		this._spaceKey = this._game.input.keyboard.addKey(
    			Phaser.Keyboard.SPACEBAR);
    		this._spaceKey.onDown.add(this._startGame, this);

    		this._escKey = this._game.input.keyboard.addKey(
    			Phaser.Keyboard.ESC);
    		this._escKey.onDown.add(this._backToMenu, this);
		};

		WinState.prototype._startGame = function() {
			this._game.state.start('load');
		};

		WinState.prototype._backToMenu = function() {
			$state.go('menu');
		};
 
		WinState.prototype._showWinScreen = function() {
			this._tipText = this._game.add.text(
				this._game.world.width / 2,
				this._game.world.height / 2, 
				"You WIN.\n<SPACE> to continue game.\n<ESC> to back to menu",
				 { font: "12px Press Start 2P", fill: "#000", align: "center" });
			this._tipText.anchor.setTo(0.5, 0.5);
		};

		return WinState;
	});