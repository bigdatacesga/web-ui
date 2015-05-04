'use strict';

// Declare app level module which depends on views, and components
angular
.module('hadoopApp', [
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'hadoopApp.services.auth',
  'hadoopApp.menu',
  'hadoopApp.dashboard',
  'hadoopApp.clusters',
  'hadoopApp.launcher',
  'hadoopApp.login',
  'hadoopApp.sshkeys',
  'hadoopApp.firewall',
  'hadoopApp.help'
])
.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /dashboard
  $urlRouterProvider.otherwise('/dashboard');
}]);
