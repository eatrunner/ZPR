angular
  	.module('components.game')
  	.factory('LoseState', function($state) {
		function LoseState(game) {
			this._game = game;
		}

		LoseState.prototype.init = function(gameInfo) {
			this._gameInfo = gameInfo;
		};
 
		LoseState.prototype.create = function() {
			this._showLoseScreen();
    		this._escKey = this._game.input.keyboard.addKey(
    			Phaser.Keyboard.ESC);
    		this._escKey.onDown.add(this._backToMenu, this);
		};

		LoseState.prototype._backToMenu = function() {
			$state.go('menu');
		};

		LoseState.prototype._showLoseScreen = function() {
			this._tipText = this._game.add.text(
				this._game.world.width / 2,
				this._game.world.height / 2, 
				"You LOSE.\n<ESC> to back to the menu", { font: "12px Press Start 2P", fill: "#000", align: "center" });
			this._tipText.anchor.setTo(0.5, 0.5);
		};

		return LoseState;
	});