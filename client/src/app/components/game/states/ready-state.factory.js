angular
  	.module('app.components.game.states')
  	.factory('ReadyState', function($http, $q, gameService, $log) {
		function ReadyState(game, gameId, mapId) {
			this.game = game;
			this.gameId = gameId;
		}

		var spacebar;
		var gameInfo;

		ReadyState.prototype.create = function() {
			showReadyInfo(this.game);
		};

		function showReadyInfo(game) {
			game.stage.backgroundColor = "#808080";

			var labelOpts = {
				font: '14px Press Start 2P',
				fill: '#000',
				align: 'center'
			};

			var label = game.add.text(
				game.world.width / 2, 
				game.world.height / 2, 
				'GETTING GAME...', 
				labelOpts);

			label.anchor.setTo(0.5, 0.5);
			label.alpha = 0;
			game.add.tween(label).to( 
				{ alpha: 1 }, 
				1000, 
				Phaser.Easing.Linear.None, 
				true, 0, 500, true);

			gameService
				.getGameInfo()
				.then(getGameInfoCallback, getGameInfoError);
		}

		function getGameInfoCallback(response) {
			if(response.errors) {
				// TODO: show something?
				$log.warn(response.errors);
			} else {
				gameInfo = response.gameInfo;
			}
		}

		function getGameInfoError(reason) {
			$log.error(reason);
			// TODO: show something?
		}
 
		ReadyState.prototype.update = function() {
			if(gameInfo)
				this.game.state.start('play', true, false, gameInfo);
		};

		return ReadyState;
	});