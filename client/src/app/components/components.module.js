/**
* @ngdoc overview
* @name components
* @requires components.menu
* @requires components.game
*
* @description
* # components
* This is the components module. It includes all application modules.
*/
angular
	.module('components', [
		'components.menu',
		'components.game'
	]);