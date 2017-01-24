angular
	.module('components.game')
	.factory('Gui', function(GameService, ScoreBoard, PauseScreen, Keyboard) {
		var GAME_REFRESH_MS = 1000;
		var FACTOR = 16;

		function Gui(game, gameInfo, scope) {
			this._game = game;

			this._scoreBoard = new ScoreBoard(game, gameInfo, scope);
			this._pauseScreen = new PauseScreen(game, gameInfo, scope);
			this._keyboard = new Keyboard(game, gameInfo,scope);

			this._createTipText();
		}

		Gui.prototype.kill = function() {
			this._scoreBoard.kill();
			this._pauseScreen.kill();
			this._keyboard.kill();
		};

		Gui.prototype._createTipText = function() {
			this._tipText = this._game.add.text(
				this._game.world.width / 2,
				this._game.world.height - FACTOR, 
				"Use <ARROWS> to move, <SPACE> to shoot,\n<ESC> to pause/resume", { font: "6px Press Start 2P", fill: "#000", align: "center" });
			this._tipText.anchor.setTo(0.5, 0.5);
		};
 
		return Gui;
	});