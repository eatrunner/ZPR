angular
	.module('app.components.game')
	.value('gameSession', {
		gameId: 0
	});

angular
	.module('app.components.game')
	.directive('game', function(gameSession, BootState, LoadState, PlayState) {
		var linkFn = function(scope, ele, attrs) {
			var game = new Phaser.Game(24*16, 20*16, Phaser.CANVAS, 'game-canvas');

			gameSession.gameId = scope.gameId;

			game.state.add('boot', new BootState(game));
			game.state.add('load', new LoadState(game));
			game.state.add('play', new PlayState(game));
			game.state.start('boot');

			scope.$on('$destroy', function() {
				game.destroy();
			});
		};

		return {
			template: '<div id="game-canvas"></div>',
			scope: {
				gameId: '='
			},
			replace: true,
			compile: function(iEle, iAttrs) {
				return linkFn;
			}
		};
	});