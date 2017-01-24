angular
	.module('components.game')
	.factory('ScoreBoard', function(GAME_EVENTS) {
		var FACTOR = 16;

		function ScoreBoard(game, gameInfo, scope) {
			this._game = game;
			this._score = 0;

			this._scoreCaption = game.add.text(
				game.world.width / 2, 
				FACTOR / 2, 
				"Score: " + this._getPaddedScore(this._score), 
				{ font: "16px Press Start 2P", fill: "#000", align: "left" });
			this._scoreCaption.anchor.setTo(0.5, 0);

			this._deregScoreListener = scope.$on(GAME_EVENTS.SCORE_UPDATE,
				this._updateCallback.bind(this));
		}

		ScoreBoard.prototype._updateCallback = function(event, newScore) {
			this._setScore(newScore);
		};

		ScoreBoard.prototype.kill = function() {
			this._deregScoreListener();
		};

		ScoreBoard.prototype._setScore = function(score) {
			var newScore = this._getPaddedScore(score);
			this._scoreCaption.text = "Score: " + newScore;
		};

		ScoreBoard.prototype._getPaddedScore = function(number) {
			var s = "000000000" + number;
    		return s.substr(s.length-8);
		};

		return ScoreBoard;
	});