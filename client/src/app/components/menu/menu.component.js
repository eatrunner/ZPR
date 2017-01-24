var menu = {
  templateUrl: './menu.html'
};

/**
* @ngdoc directive
* @name components.menu.directive:menu

* @description
* Navigation component, by default showed as first page in app.
*/
angular
  .module('components.menu')
  .component('menu', menu);
