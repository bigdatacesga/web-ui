'use strict';

// Declare app level module which depends on views, and components
angular
.module('cesgaBDApp', [
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'cesgaBDApp.components.endpoints.auth',
  'cesgaBDApp.menu',
  'cesgaBDApp.dashboard',
  'cesgaBDApp.bigdata_services',
    'cesgaBDApp.bigdata_instances',
  'cesgaBDApp.cloud_services',
  'cesgaBDApp.login',
  'cesgaBDApp.help',
  'cesgaBDApp.launcher.cloud',
  'cesgaBDApp.launcher.bigdata',
    'cesgaBDApp.details.bigdata',
    'cesgaBDApp.components.endpoints.ips',
    'cesgaBDApp.components.endpoints.keys'

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