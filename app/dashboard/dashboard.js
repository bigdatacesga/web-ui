'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.dashboard.home:HomeCtrl
 * @description 
 * # HomeCtrl
 * Controller of the home view of the dashboard
 * The home view is also the first view seen by a user
 */
angular.module('hadoopApp.dashboard', ['ui.router', 'hadoopApp.stat'])

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

.controller('DashboardCtrl', [function() {
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  vm.stats = [
    {
      link:"#/clusters",
      comments:"Clusters",
      colour:"primary",
      type:"database"
    },
    {
      link:"#/firewall",
      comments:"AllowedIPs",
      colour:"green",
      type:"arrows-h"
    },
    {
      link:"#/sshkeys",
      comments:"SSH Keys",
      colour:"red",
      type:"key"
    }
  ];
  // var asd = 9090;
  // vm.clusters = 
  // var clustersLength = 0;
  // function getClusters() {
  //   return ClusterService.list()
  //     .then(function(data){
  //       vm.clusters = data.data;
  //       vm.clustersLength = vm.clusters.lentgh;
  //     })
  //     .catch(function(error) {
  //       vm.errorMessage = 'Unable to connect to the Big Data service';
  //       $log.info('Status: ' + error.status);
  //       $log.info('Error message: '+ error.data.message);
  //     });
  // }
  // var dahj = 90;
  // clustersLength = 90;
  // var asdf = 90;
  // function getIps() {
  //     return IpService.getAll()
  //       .then(function(data){
  //         vm.ips = data.data;
  //       })
  //       .catch(function(error) {
  //         vm.errorMessage = 'Unable to connect to the Big Data service';
  //         $log.warn(vm.errorMessage);
  //         $log.info('Status: ' + error.status);
  //         $log.info('Error message: '+ error.data.message);
  //       });
  //   }


  // function getKeys() {
  //   return KeyService.getAll()
  //     .then(function(data){
  //       vm.keys = data.data;
  //     })
  //     .catch(function(error) {
  //       vm.errorMessage = 'Unable to connect to the Big Data service';
  //       $log.warn(vm.errorMessage);
  //       $log.info('Status: ' + error.status);
  //       $log.info('Error message: '+ error.data.message);
  //     });
  // }


}]);
