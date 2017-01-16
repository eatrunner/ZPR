
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
	.module('app.components', [
		'app.components.menu',
		'app.components.single-player',
		'app.components.game'
	]);
