'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.dashboard.home:HomeCtrl
 * @description 
 * # HomeCtrl
 * Controller of the home view of the dashboard
 * The home view is also the first view seen by a user
 */
angular.module('hadoopApp.dashboard', ['ui.router', 'hadoopApp.stat', 'hadoopApp.service.clusters','hadoopApp.service.ips','hadoopApp.service.keys'])

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

.controller('DashboardCtrl', ['ClusterService','IpService','KeyService', function(ClusterService,IpService,KeyService) {
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];


  var errorNumber = "#unknown"
  vm.stats = {
    clusters : {
      link:"#/clusters",
      comments:"Clusters",
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


  getClusters();
  getIps();
  getKeys();

  function getClusters() {
    return ClusterService.list()
      .then(function(data){
        vm.clusters = data.data;
        vm.stats.clusters.number = vm.clusters.length;
      })
      .catch(function(error) {
        vm.stats.clusters.number = errorNumber;
      });
  }
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
