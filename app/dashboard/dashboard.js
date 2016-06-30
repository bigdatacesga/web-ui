'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.dashboard.home:HomeCtrl
 * @description 
 * # HomeCtrl
 * Controller of the home view of the dashboard
 * The home view is also the first view seen by a user
 */
angular.module('cesgaBDApp.dashboard', ['ui.router', 'cesgaBDApp.stat', 'cesgaBDApp.components.endpoints.bigdata', 'cesgaBDApp.components.endpoints.cloud', 'cesgaBDApp.components.endpoints.ips','cesgaBDApp.components.endpoints.keys'])

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

.controller('DashboardCtrl', ['BigdataService', 'CloudService', 'IpService', 'KeyService', '$window', function(BigdataService, CloudService, IpService, KeyService, $window) {
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];


  var errorNumber = "#unknown"
  vm.stats = {
    bigdata : {
      link:"#/bigdata_instances",
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
    },
    ips: {
      link:"#/firewall",
      comments:"AllowedIPs",
      colour:"green",
      type:"arrows-h",
      number: errorNumber
    },
    keys: {
      link:"#/sshkeys",
      comments:"SSH Keys",
      colour:"red",
      type:"key",
      number: errorNumber
    }
  };


  var receivedData;

  getBigdata();
  function getBigdata() {
    var username = window.sessionStorage.username;
    return BigdataService.listInstances(username,null,null)
      .then(function(data){
        receivedData = data.data;
        if(receivedData == undefined){

        }else{
          vm.bigdata = receivedData.clusters;
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


  getIps();
  function getIps() {
    return IpService.getAll()
        .then(function(data){
          vm.ips = data.data;
          vm.stats.ips.number = vm.ips.length;
        })
        .catch(function(error) {
          vm.stats.ips.number = errorNumber;
        });
  }


  getKeys();
  function getKeys() {
    return KeyService.getAll()
        .then(function(data){
          vm.keys = data.data;
          vm.stats.keys.number = vm.keys.length;
        })
        .catch(function(error) {
          vm.stats.keys.number = errorNumber;
        });
  }



}]);
