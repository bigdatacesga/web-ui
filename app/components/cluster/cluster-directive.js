'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.cluster.cluster-directive:cluster
 * @description
 * # stats
 */
angular.module('hadoopApp.cluster.cluster-directive', ['hadoopApp.service.clusters'])

.directive('cluster', ['ClusterService' ,function(ClusterService) {
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

      
      scope.toggleDetails = function() {
        if(vmCluster.showDetails == 'false') {
          vmCluster.showDetails = 'true';
        } else {
          vmCluster.showDetails = 'false';
        }
      };
      scope.isCollapsed = function() {
        if(vmCluster.showDetails == 'false') {
          return true;
        } else {
          return false;
        }
      };
      scope.removeCluster = function() {
        this.onClusterServiceRemoveSuccess = function(data){
            element.html('');
        };

        this.onClusterServiceRemoveError = function(data){
            alert('The Cluster could not be removed due to a server-side error.\n'+
                'Please notify administrator');
        };
        
        ClusterService.remove(scope.clusterData.id).success(function (data){
          vmCluster.onClusterServiceRemoveSuccess(data);
        }).error(function (data){
          vmCluster.onClusterServiceRemoveError(data);
        });
      };


      scope.getClusterState = function(){
        if(vmCluster.clusterData.exitStatus == '0' && vmCluster.clusterData.stopTime == null){
          return 'running';
        }else{
          return 'stopped';
        }
      }

      scope.getExitStatus = function(){
        if(vmCluster.clusterData.exitStatus == '0' && vmCluster.clusterData.stopTime == null){
          return 'pull-right ok';
        }else{
          return 'pull-right error';
        }
      }

    },
  };
}]);
