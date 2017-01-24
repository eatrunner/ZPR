angular
	.module('components.game')
	.constant('GAME_EVENTS', {
	  STATUS_UPDATE: 'status-update',
	  SCORE_UPDATE: 'score-update',
	  MAP_UPDATE: 'map-update',
	  TANKS_UPDATE: 'tanks-update',
	  BONUSES_UPDATE: 'bonuses_update',
	  BULLETS_UPDATE: 'bullets_update'
	});