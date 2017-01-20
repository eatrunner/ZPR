angular
	.module('app.components.game')
	.directive('game', function(BootState, LoadState, PlayState) {
		var linkFn = function(scope, ele, attrs) {
			var game = new Phaser.Game("100%", ele[0].clientHeight, Phaser.CANVAS, 'game-canvas');

			game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.state.add('boot', new BootState(game));
			game.state.add('load', new LoadState(game, scope.gameId));
			game.state.add('play', new PlayState(game, scope.gameId));
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