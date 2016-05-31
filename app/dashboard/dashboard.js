'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.dashboard.home:HomeCtrl
 * @description 
 * # HomeCtrl
 * Controller of the home view of the dashboard
 * The home view is also the first view seen by a user
 */
angular.module('cesgaBDApp.dashboard', ['ui.router', 'cesgaBDApp.stat', 'cesgaBDApp.components.endpoints.bigdata', 'cesgaBDApp.components.endpoints.cloud'])

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

.controller('DashboardCtrl', ['BigdataService', 'CloudService', function(BigdataService, CloudService) {
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];


  var errorNumber = "#unknown"
  vm.stats = {
    bigdata : {
      link:"#/bigdata",
      comments:"Bigdata Clusters",
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
    }
  };


  var receivedData;

  getBigdata();
  function getBigdata() {
    var name = "jenes" //FIX THIS by getting the real username
    
    return BigdataService.listInstances(name,null,null)
      .then(function(data){
        receivedData = data.data;
        if(receivedData == undefined){

        }else{
          vm.bigdata = receivedData.services;
          vm.stats.bigdata.number = vm.bigdata.length;
        }
      })
      .catch(function(error) {
        vm.stats.bigdata.number = errorNumber;
      });
  }

  getCloud();
  var errorMessage;
  function getCloud() {
    return CloudService.list()
      .then(function(data){
        receivedData = data.data;
        if(receivedData == undefined){
            errorMessage = "Sorry :( , it seems we could not get info from the server, it may be down.";
            alert(errorMessage);
        }else{
          vm.cloud = data.data;
          vm.stats.cloud.number = vm.cloud.length;
        }
      })
      .catch(function(error) {
        vm.stats.cloud.number = errorNumber;
      });
  }
}]);
