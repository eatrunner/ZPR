angular
  	.module('app.components.game')
  	.factory('ReadyState', function($http, $q, GameService, $log) {
		function ReadyState(game) {
			this._game = game;
			this._starting = false;
		}

		ReadyState.prototype.init = function(gameInfo) {
			this._gameInfo = gameInfo;
		};
 
		ReadyState.prototype.create = function() {
			this._showReadyScreen();
    		this._spaceKey = this._game.input.keyboard.addKey(
    			Phaser.Keyboard.SPACEBAR);
    		this._spaceKey.onDown.add(this._startGame, this);
		};

		ReadyState.prototype._showReadyScreen = function() {
			this._tipText = this._game.add.text(
				this._game.world.width / 2,
				this._game.world.height / 2, 
				"Your game is ready.\nPress <SPACE> to start.", { font: "14px Press Start 2P", fill: "#000", align: "center" });
			this._tipText.anchor.setTo(0.5, 0.5);
		};

		ReadyState.prototype._startGame = function() {
			if(this._starting)
				return;

			this._starting = true;
			GameService.startGame()
				.then(startGameCallback, startGameError);

			var self = this;
			function startGameCallback(response) {
				self._game.state.start('play', true, 
					false, self._gameInfo);
			}

			function startGameError(reason) {
				$log.error(reason);
				alert('Error occured');
			}
		}; 

		return ReadyState;
	});