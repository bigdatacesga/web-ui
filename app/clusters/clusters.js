'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.clusters:ClustersCtrl
 * @description 
 * # ClustersCtrl
 * Controller of the clusters view 
 * Allows to see active clusters and to launch new clusters
 */
angular.module('hadoopApp.clusters', ['ui.router', 'hadoopApp.notifications', 'hadoopApp.cluster', 'hadoopApp.service.clusters'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('clusters', {
    url:'/clusters',
    templateUrl: 'clusters/clusters.html',
    controller: 'ClustersCtrl',
    controllerAs: 'clusters'
  });
}])

.controller('ClustersCtrl', 
            ['ClusterService', '$log', '$state', function(ClusterService, $log, $state) {

  var vm = this;

  vm.clusters = [];

  activate();

  vm.launchClusterWizard = function() {
    // Open the modal to launch a new cluster
    $state.go('launcher');
  };

  function activate() {
    return ClusterService.list()
      .then(function(data){
        vm.clusters = data;
      })
      .catch(function(error) {
        vm.errorMessage = 'Unable to connect to the Big Data service';
        $log.warn(vm.errorMessage);
        $log.info('Status: ' + error.status);
        $log.info('Error message: '+ error.data.message);
      });
    //TODO: Errors should be handled globally in a $http interceptor
    //      eg. status=401 -> redirect to login page
  }

  /*
  self.clusters = [
    {
      id:"189",
      user:"uscfajlc",
      group:"hadoop",
      name:"hadoop-189",
      vms:[
        {
          vmid:"42077",
          status:"runn",
          ucpu:2,
          umem:"2G",
          host:"nubacesga-10-1",
          time:"0d00h06",
          name:"hadoop-189-0",
          ip:"193.144.33.100"
        },
        {
          vmid:"42078",
          status:"runn",
          ucpu:1,
          umem:"1024M",
          host:"nubacesga-05-2",
          time:"0d00h06",
          name:"hadoop-189-1",
          ip:"10.38.1.2"
        }
      ],
      exitStatus:0
    },
    {
      id:"190",
      user:"uscfajlc",
      group:"hadoop",
      name:"hadoop-190",
      vms:[
        {
          vmid:"42079",
          status:"runn",
          ucpu:2,
          umem:"2G",
          host:"nubacesga-10-1",
          time:"0d00h06",
          name:"hadoop-189-0",
          ip:"193.144.33.100"
        },
        {
          vmid:"42080",
          status:"runn",
          ucpu:1,
          umem:"1024M",
          host:"nubacesga-05-2",
          time:"0d00h06",
          name:"hadoop-189-1",
          ip:"10.38.1.2"
        }
      ],
      exitStatus:0
    }
  ];
  */

}]);
