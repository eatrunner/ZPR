
/**
 *
 * @ngdoc module
 * @name components
 *
 * @requires components.contact
 * @requires components.auth
 *
 * @description
 *
 * This is the components module. It includes all of our components.
 *
 **/
angular
	.module('app.components.single-player', [
		'ui.select',
		'ngSanitize',
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('single-player', {
		        url: '/single',
		        templateUrl: './single-player.html',
		        redirectTo: 'single-player.new-sp-game'
		    })
		    .state('single-player.new-sp-game', {
		    	url: '/new',
		    	component: 'newSpGame'
		    })
		    .state('single-player.create-sp-game', {
		    	url: '/create/:mapId',
		    	template: '<h3>Game was created successfully!</h3>',
		    	controller: function($state, createGamePromise) {
		    		$state.go('game', {
		    			gameId: createGamePromise.gameId
		    		});
		    	},
		    	resolve: {
		    		createGamePromise: function(singlePlayerService, $stateParams, $q) {
		    			return singlePlayerService.createGame({
		    				mapId: $stateParams.mapId
		    			});
		    		}
		    	}
		    });
	});
