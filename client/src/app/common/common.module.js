
/**
 *
 * @ngdoc module
 * @name common
 *
 * @requires ui.router
 * @requires angular-loading-bar
 *
 * @description
 *
 * This is the common module. It includes a run method
 *
 **/
angular
  .module('app.common', [
  	'app.common.main',
  	'app.common.sidebar',
  	'app.common.topbar'
  ])
  .run(function ($transitions) {
    // $transitions.onStart({}, cfpLoadingBar.start);
    // $transitions.onSuccess({}, cfpLoadingBar.complete);
  });
