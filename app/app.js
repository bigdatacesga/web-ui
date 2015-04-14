'use strict';

// Declare app level module which depends on views, and components
angular
.module('hadoopApp', [
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'hadoopApp.menu',
  'hadoopApp.dashboard',
  'hadoopApp.clusters',
  'hadoopApp.launcher',
  'hadoopApp.login'
])
.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
  // For any unmatched url, redirect to /dashboard
  $urlRouterProvider.otherwise('/dashboard');
}]);
