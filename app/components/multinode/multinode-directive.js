'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.multinode.multinode-directive:multinode
 * @description
 * # stats
 */
angular.module('cesgaBDApp.multinode.multinode-directive', ['cesgaBDApp.components.endpoints.multinodes', 'cesgaBDApp.components.endpoints.multinode.nodes'])

.directive('multinode', ['MultinodeService', 'NodesServiceMulti' ,function(MultinodeService, NodesServiceMulti) {
  return {
    templateUrl:'components/multinode/multinode.html',
    restrict: 'E',
    replace: true,
    scope: {
      multinodeData: '=',
      showDetails: '@'
    },
    link: function(scope, element, attrs) {
      var vmCluster = scope;

      vmCluster.multinodeData.vms = [];
      vmCluster.showDetails = 'false';


      vmCluster.refresh = function() {
          vmCluster.toggleDetails();
          vmCluster.toggleDetails();
          vmCluster.refreshClusterDetails();
      }


      vmCluster.refreshClusterDetails = function(){
          MultinodeService.show(
              vmCluster.multinodeData.service_type,
              vmCluster.multinodeData.service_name,
              vmCluster.multinodeData.instance_id
            ).success(function (data){
            vmCluster.multinodeData.exitStatus = data.exitStatus;
          }).error(function (data){
            
          });
      }

      vmCluster.toggleDetails = function() {
        if(vmCluster.showDetails == 'false') {
          NodesServiceMulti.listClusterNodes(
              vmCluster.multinodeData.service_type,
              vmCluster.multinodeData.service_name,
              vmCluster.multinodeData.instance_id
            ).success(function (data){
            vmCluster.multinodeData.vms = data.nodes;
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
        
        MultinodeService.remove(
            vmCluster.multinodeData.service_type,
            vmCluster.multinodeData.service_name,
            vmCluster.multinodeData.instance_id
            ).success(function (data){
          vmCluster.onClusterServiceRemoveSuccess(data);
        }).error(function (data){
          vmCluster.onClusterServiceRemoveError(data);
        });
      };
    },
  };
}]);
