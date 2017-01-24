/**
    * @ngdoc directive
    * @name components.game.directive:gameCanvas
    * @restrict 'A'
    * @element ANY 
    * @requires GameService
    * @requires BootState
    * @requires LoadState
    * @requires PlayState
    * @requires ReadyState

    * @description 
    * `<game-canvas>` is a directive in which Phaser game is running.
    * Here, game states are created.
    * 
    * When this directive is going to be destroyed, it destroys also Phaser resources
    *
    * Game is created with size [384, 320] pixels. Phaser ScaleManager takes care 
    * about scaling, so when the screen goes resized, gameCanvas will also.
    */
angular
	.module('components.game')
	.directive('gameCanvas', function(GameService, BootState, LoadState, PlayState, ReadyState, WinState, LoseState) {
		var linkFn = function(scope, ele, attrs) {
			var game = new Phaser.Game(24*16, 20*16, Phaser.CANVAS, 'game-canvas');

			game.state.add('boot', new BootState(game));
			game.state.add('load', new LoadState(game));
			game.state.add('play', new PlayState(game, scope));
			game.state.add('ready', new ReadyState(game));
			game.state.add('win', new WinState(game));
			game.state.add('lose', new LoseState(game));
			game.state.start('boot');

			scope.$on('$destroy', function() {
				game.destroy();
			});
		};

		return {
			template: '<div id="game-canvas"></div>',
			replace: true,
			compile: function(iEle, iAttrs) {
				return linkFn;
			}
		};
	});

/**
* A number, or a string containing a number.
* @typedef {Object} Phaser.Game
*/