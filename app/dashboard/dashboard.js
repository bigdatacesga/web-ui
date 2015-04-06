'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.dashboard.home:HomeCtrl
 * @description 
 * # HomeCtrl
 * Controller of the home view of the dashboard
 * The home view is also the first view seen by a user
 */
angular.module('hadoopApp.dashboard', ['ui.router', 'hadoopApp.stats'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('dashboard', {
    url:'/dashboard',
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', [function() {
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
}]);
