'use strict';

// Declare app level module which depends on views, and components
angular
.module('bigdata', [
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'bigdata.components.endpoints.auth',
  'bigdata.login',
  'bigdata.menu',
  'bigdata.dashboard',
  'bigdata.hdp',
  'bigdata.cloudview',
  'bigdata.products',
  'bigdata.clusters',
  'bigdata.sshkeys',
  'bigdata.firewall',
  'bigdata.help',
  'bigdata.launcher.cloud',
  'bigdata.launcher.bigdata',
  'bigdata.details.bigdata',
  'bigdata.components.endpoints.ips',
  'bigdata.components.endpoints.keys'
])
.config(['$stateProvider','$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
  // For any unmatched url, redirect to /dashboard
  $urlRouterProvider.otherwise('/dashboard');
  //For any Unauthorized error, redirect to login
  //$httpProvider.interceptors.push('APIInterceptor');
  $httpProvider.interceptors.push('APIInterceptor');
}])
.service('APIInterceptor', function() {
    //Este fragmento de código es necesario por algún motivo para que se use el auth-interceptor
    var service = this;
    service.responseError = function(response) {
        return response;
    };
});
