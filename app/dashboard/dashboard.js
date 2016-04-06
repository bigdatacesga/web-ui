'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.dashboard.home:HomeCtrl
 * @description 
 * # HomeCtrl
 * Controller of the home view of the dashboard
 * The home view is also the first view seen by a user
 */
angular.module('cesgaBDApp.dashboard', ['ui.router', 'cesgaBDApp.stat', 'cesgaBDApp.components.endpoints.multinodes', 'cesgaBDApp.components.endpoints.cloud'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('dashboard', {
    url:'/dashboard',
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl',
    controllerAs : 'dashboard',
    data: {
        requireLogin: true
    }
  });
}])

.controller('DashboardCtrl', ['MultinodeService', 'CloudService', function(MultinodeService, CloudService) {
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];


  var errorNumber = "#unknown"
  vm.stats = {
    multinodes : {
      link:"#/multinode",
      comments:"Multinode Clusters",
      colour:"primary",
      type:"database",
      number:errorNumber
    },
    cloud : {
      link:"#/cloud",
      comments:"Cloud Clusters",
      colour:"primary",
      type:"database",
      number:errorNumber
    }// ,
    // singles : {
    //   link:"#/simple_services",
    //   comments:"Single Node Applications",
    //   colour:"green",
    //   type:"database",
    //   number:errorNumber
    // }
  };


  getMultinodes();
  function getMultinodes() {
    return MultinodeService.list("multi")
      .then(function(data){
        vm.multinodes = data.data.services;
        vm.stats.multinodes.number = vm.multinodes.length;
      })
      .catch(function(error) {
        vm.stats.multinodes.number = errorNumber;
      });
  }

  getCloud();
  function getCloud() {
    return CloudService.list()
      .then(function(data){
        vm.cloud = data.data;
        vm.stats.cloud.number = vm.cloud.length;
      })
      .catch(function(error) {
        vm.stats.cloud.number = errorNumber;
      });
  }

}]);
