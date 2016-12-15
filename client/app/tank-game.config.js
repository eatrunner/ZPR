(function() {
	'use strict';

	angular
		.module('tankGame')
		.config(tankGameConfig);

	function tankGameConfig($stateProvider, $urlRouterProvider, $translateProvider) {
		$stateProvider
	        .state('menu', {//State demonstrating Nested views
	            url: "/menu",
	            template: '<menu></menu>'
	        })
	        .state('settings', {
	        	url: "/settings",
	        	component: 'settings'
	        })
	        .state('highscores', {
	        	url: "/highscores",
	        	component: 'highscores'
	        })

	        .state('single-player', {
	        	url: '/single-player',
	        	component: 'singlePlayer'
	        })
	        .state('single-player.new-game', {
	        	url: '/new-game',
	        	params: {
	        		mapId: null
	        	},
	        	views: {
	        		'': {
	        			component: 'newGame',

	        		},
	        		'selectMap@single-player.new-game': {
	        			component: 'selectMapDropdown',
	        			params: {
	        				mapId: null
	        			}
	        		}
	        	}
	        })

	        .state('single-player.load-game', {
	        	url: '/load-game',
	        	component: 'loadGame'
	        });                                                                                                                                          

		$urlRouterProvider
			.otherwise('/menu');

		$translateProvider.useStaticFilesLoader({
			prefix: 'translations/',
			suffix: '.json'
		});

		$translateProvider.registerAvailableLanguageKeys(['en']);
		$translateProvider.preferredLanguage('en');
	}
})();