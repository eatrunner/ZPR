angular
	.module('app.components.game.entities')
	.factory('ScoreBoard', function(GameState) {
		var FACTOR = 16;
		var GAME_MAX_WIDTH = 16;
		var GAME_MARGIN_WIDTH = 4;
		function ScoreBoard(game, gameInfo, gameState) {
			this._game = game;
			this._score = 0;

			gameState.onUpdate.add(this._update, this);
			this._scoreCaption = game.add.text(
				game.world.width / 2, 
				FACTOR / 2, 
				"Score: " + this._getPaddedScore(this._score), 
				{ font: "16px Press Start 2P", fill: "#000", align: "left" });
			this._scoreCaption.anchor.setTo(0.5, 0);
		}

		ScoreBoard.prototype._update = function(gameStateData) {
			if(gameStateData.status === GameState.Statuses.RUN) {
				var newScore = this._getPaddedScore(gameStateData.score);
				this._scorePoints.text = newScore;
			}
		};

		ScoreBoard.prototype._getPaddedScore = function(number) {
			var s = "000000000" + number;
    		return s.substr(s.length-8);
		};

		return ScoreBoard;
	});