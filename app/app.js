'use strict';

// Declare app level module which depends on views, and components
angular.module('hadoopApp', [
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'hadoopApp.menu',
  'hadoopApp.dashboard',
  'hadoopApp.clusters'
]).
config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/dashboard');

  //$stateProvider
    //.state('dashboard', {
      //url:'/dashboard',
      //templateUrl: 'dashboard/main.html',
    //})
    //.state('dashboard.home',{
      //url:'/home',
      //controller: 'HomeCtrl',
      //templateUrl:'dashboard/home.html',
    //})

}]);
//config(['$routeProvider', function($routeProvider) {
// $routeProvider.otherwise({redirectTo: '/view1'});
//}]);
