angular
	.module('app.components.game.entities')
	.factory('BeforePlayScreen', function() {

		function BeforePlayScreen(game, gameInfo) {
			this.game = game;

			this.group = createInitScreenGroup(game, gameInfo);
			this.initScreenTween = createInitScreenTween(game, 
				this.group);
		}

		BeforePlayScreen.prototype.hide = function(onHideCallback) {
			this.initScreenTween.start();
		};

		var createInitScreenGroup = function(game, gameInfo) {
			var stageNumber = gameInfo.mapId;
			var initScreenGroup = game.add.group();

			var initScreenBmd = game.add.bitmapData(
				game.world.width, game.world.height);
			initScreenBmd.ctx.beginPath();
			initScreenBmd.ctx.rect(0, 0, 
				game.world.width, game.world.height);
			initScreenBmd.ctx.fillStyle = '#aaaaaa';
			initScreenBmd.ctx.fill();

			var initScreenSprite = initScreenGroup.create(
				0, 0,
				initScreenBmd);

			var labelOpts = {
				font: '32px Press Start 2P',
				fill: '#000',
				align: 'center'
			};

			var label = game.add.text(
				game.world.width / 2, 
				game.world.height / 2, 
				'STAGE #' + stageNumber, 
				labelOpts,
				initScreenGroup);
			label.anchor.setTo(0.5, 0.5);

			return initScreenGroup;
		};

		var createInitScreenTween = function(game, initScreenGroup) {
			var tweenProps = { 
				height: 0, 
				width: 0, 
				x: game.world.width/2, 
				y: game.world.height/2 
			};

			var initScreenTween = game.add.tween(initScreenGroup)
				.to(tweenProps, 250, Phaser.Easing.Linear.None, false, 1000);

			return initScreenTween;
		};

		return BeforePlayScreen;
	});