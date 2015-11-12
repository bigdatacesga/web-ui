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
  'hadoopApp.login',
  'hadoopApp.sshkeys',
  'hadoopApp.firewall',
  'hadoopApp.help',
  'hadoopApp.launcher'
])
.config(['$stateProvider','$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
  // For any unmatched url, redirect to /dashboard
  $urlRouterProvider.otherwise('/dashboard');
  //For any Unauthorized error, redirect to login
  $httpProvider.interceptors.push('APIInterceptor');
}])
.service('APIInterceptor', function() {
    //Este fragmento de código es necesario por algún motivo para que se use el auth-interceptor
    var service = this;
    service.responseError = function(response) {
        return response;
    };
});