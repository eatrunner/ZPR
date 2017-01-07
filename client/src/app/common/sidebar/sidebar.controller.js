function SidebarController() {
  var ctrl = this;
  ctrl.sidebarItems = [
    {
      name: 'MENU',
      state: 'menu'
    },
    {
      name: 'SINGLE',
      state: 'single'
    },
    {
      name: 'MULTI',
      state: 'multi'
    },
    {
      name: 'HIGHSCORES',
      state: 'highscores'
    },
    {
      name: 'SETTINGS',
      state: 'settings'
    }
  ];
}

/*
 * @ngdoc type
 * @module common
 * @name SidebarController
 *
 * @description
 *
 * ## Lorem Ipsum 1
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 *
 * ## Lorem Ipsum 2
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 */
angular
  .module('app.common.sidebar')
  .controller('SidebarController', SidebarController);
