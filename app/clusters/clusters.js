'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.clusters:ClustersCtrl
 * @description 
 * # ClustersCtrl
 * Controller of the clusters view 
 * Allows to see active clusters and to launch new clusters
 */
angular.module('hadoopApp.clusters', ['ui.router', 'hadoopApp.notifications', 'hadoopApp.cluster'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('clusters', {
    url:'/clusters',
    templateUrl: 'clusters/clusters.html',
    controller: 'ClustersCtrl',
    controllerAs: 'clusters'
  });
}])

.controller('ClustersCtrl', [function() {
  var self = this;

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

  self.isCollapsed = {};
  for (var i=0; i<self.clusters.length; i++) {
    var cluster = self.clusters[i];
    self.isCollapsed[cluster.id] = true;
  }
  
  self.toggleDetails = function(clusterId) {
    self.isCollapsed[clusterId] = !self.isCollapsed[clusterId];
  };
}]);
