angular
  	.module('components.game')
  	.factory('LoadState', function(GameService, $log) {
		function LoadState(game) {
			this._game = game;
		}

		LoadState.prototype.create = function() {
			this._showLoadingScreen();

			GameService
				.getGameInfo()
				.then(getGameInfoCallback, getGameInfoError);

			var those = this;
			function getGameInfoCallback(response) {
				var gameInfo = response;

				those._game.state.start('ready', true, false, gameInfo);
			}

			function getGameInfoError(reason) {
				$log.error(reason);
			}
		};

		LoadState.prototype._showLoadingScreen = function() {
			this._game.stage.backgroundColor = "#808080";

			var labelOpts = {
				font: '14px Press Start 2P',
				fill: '#000',
				align: 'center'
			};

			var label = this._game.add.text(
				this._game.world.width / 2, 
				this._game.world.height / 2, 
				'LOADING GAME...', 
				labelOpts);

			label.anchor.setTo(0.5, 0.5);
			label.alpha = 0;
			this._game.add.tween(label).to( 
				{ alpha: 1 }, 
				1000, 
				Phaser.Easing.Linear.None, 
				true, 0, 500, true);
		};


		return LoadState;
	});