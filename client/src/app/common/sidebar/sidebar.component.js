var sidebar = {
  templateUrl: './sidebar.html',
  controller: 'SidebarController'
};

angular
  .module('app.common.sidebar')
  .component('sidebar', sidebar);
