angular
	.module('app.components.game')
	.directive('game', function(LoaderState, ReadyState, PlayState) {
		var linkFn = function(scope, ele, attrs) {
			var game = new Phaser.Game("100%", ele[0].clientHeight, Phaser.CANVAS, 'game-canvas');

			game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.state.add('loader', new LoaderState(game));
			game.state.add('ready', new ReadyState(game));
			game.state.add('play', new PlayState(game));
			game.state.start('loader');

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