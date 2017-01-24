angular
	.module('app.components.game')
	.factory('Gui', function(GameState, GameService, ScoreBoard, GameKeyboard, Direction) {
		var GAME_REFRESH_MS = 1000;
		var FACTOR = 16;

		function Gui(game, gameInfo, gameState) {
			this._game = game;

			gameState.onUpdate.add(this._update, this);
			this._gameKeyboard = new GameKeyboard(game, gameInfo, gameState);
			this._createTipText();
		}
		
		Gui.prototype._update = function(gameStateData) {

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