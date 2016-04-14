'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.cloud.cloud-directive:cloud
 * @description
 * # stats
 */
angular.module('cesgaBDApp.cloud.cloud-directive', ['cesgaBDApp.components.endpoints.cloud', 'cesgaBDApp.components.endpoints.cloud.nodes'])

.directive('cloud', ['CloudService', 'NodesServiceCloud' ,function(CloudService, NodesServiceCloud) {
  return {
    templateUrl:'components/cloud/cloud.html',
    restrict: 'E',
    replace: true,
    scope: {
      cloudData: '=',
      showDetails: '@'
    },
    link: function(scope, element, attrs) {
      var vmCluster = scope;

      vmCluster.cloudData.vms = [];
      vmCluster.showDetails = 'false';


      vmCluster.refresh = function() {
          vmCluster.toggleDetails();
          vmCluster.toggleDetails();
          vmCluster.refreshClusterDetails();
          // NodesService.listClusterNodes(vmCluster.cloudData.id).success(function (data){
          //   vmCluster.cloudData.vms = data;
          // }).error(function (data){
            
          // });
      }


      vmCluster.refreshClusterDetails = function(){
          CloudService.show(vmCluster.cloudData.id).success(function (data){
            vmCluster.cloudData.exitStatus = data.exitStatus;
          }).error(function (data){
            
          });
      }

      vmCluster.toggleDetails = function() {
        if(vmCluster.showDetails == 'false') {
          NodesServiceCloud.listClusterNodes(vmCluster.cloudData.id).success(function (data){
            vmCluster.cloudData.vms = data;
            vmCluster.showDetails = 'true';
          }).error(function (data){
             alert('Could not get the nodes info.');
             vmCluster.showDetails = 'true';
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
        
        CloudService.remove(vmCluster.cloudData.id).success(function (data){
          vmCluster.onClusterServiceRemoveSuccess(data);
        }).error(function (data){
          vmCluster.onClusterServiceRemoveError(data);
        });
      };


      vmCluster.getClusterState = function(){
        if(vmCluster.cloudData.exitStatus == null){
          return 'starting';
        }

        if(vmCluster.cloudData.exitStatus == '0' && vmCluster.cloudData.stopTime == null){
          return 'running';
        }else{
          return 'stopped';
        }
      }

      vmCluster.getExitStatus = function(){
        if(vmCluster.cloudData.exitStatus == null){
          return 'pull-right start';
        }
        if(vmCluster.cloudData.exitStatus == '0' && vmCluster.cloudData.stopTime == null){
          return 'pull-right ok';
        }else{
          return 'pull-right error';
        }
      }

    },
  };
}]);
