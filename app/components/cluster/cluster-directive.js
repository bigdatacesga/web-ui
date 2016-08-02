'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.cluster.cluster-directive:cluster
 * @description
 * # stats
 */
angular.module('hadoopApp.cluster.cluster-directive', ['hadoopApp.service.clusters', 'hadoopApp.service.nodes'])

.directive('cluster', ['ClusterService', 'NodesService' ,function(ClusterService, NodesService) {
  return {
    templateUrl:'components/cluster/cluster.html',
    restrict: 'E',
    replace: true,
    scope: {
      clusterData: '=',
      showDetails: '@'
    },
    link: function(scope, element, attrs) {
      var vmCluster = scope;

      vmCluster.clusterData.vms = [];
      vmCluster.showDetails = 'false';


      vmCluster.refresh = function() {
          vmCluster.toggleDetails();
          vmCluster.toggleDetails();
          vmCluster.refreshClusterDetails();
          // NodesService.listClusterNodes(vmCluster.clusterData.id).success(function (data){
          //   vmCluster.clusterData.vms = data;
          // }).error(function (data){
            
          // });
      }


      vmCluster.refreshClusterDetails = function(){
          ClusterService.show(vmCluster.clusterData.id).success(function (data){
            vmCluster.clusterData.exitStatus = data.exitStatus;
          }).error(function (data){
            
          });
      }

      vmCluster.toggleDetails = function() {
        if(vmCluster.showDetails == 'false') {
          NodesService.listClusterNodes(vmCluster.clusterData.id).success(function (data){
            vmCluster.clusterData.vms = data;
            vmCluster.showDetails = 'true';
          }).error(function (data){
            
          });
        } else {
          vmCluster.showDetails = 'false';
        }
      };
      vmCluster.isCollapsed = function() {
          return vmCluster.showDetails == 'false';
      };
      vmCluster.removeCluster = function() {
        this.onClusterServiceRemoveSuccess = function(data){
            element.html('');
        };

        this.onClusterServiceRemoveError = function(data){
            alert('The Cluster could not be removed due to a server-side error.\n'+
                'Please notify administrator');
        };
        
        ClusterService.remove(vmCluster.clusterData.id).success(function (data){
          vmCluster.onClusterServiceRemoveSuccess(data);
        }).error(function (data){
          vmCluster.onClusterServiceRemoveError(data);
        });
      };


      vmCluster.getClusterState = function(){
        if(vmCluster.clusterData.exitStatus == null){
          return 'starting';
        }

        if(vmCluster.clusterData.exitStatus == '0' && vmCluster.clusterData.stopTime == null){
          return 'running';
        }else{
          return 'stopped';
        }
      }

      vmCluster.getExitStatus = function(){
        if(vmCluster.clusterData.exitStatus == null){
          return 'pull-right start';
        }
        if(vmCluster.clusterData.exitStatus == '0' && vmCluster.clusterData.stopTime == null){
          return 'pull-right ok';
        }else{
          return 'pull-right error';
        }
      }

    },
  };
}]);
