'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.bigdataInstance.bigdataInstance-directive:bigdataInstance
 * @description
 * # stats
 */
angular.module('cesgaBDApp.bigdataInstance.bigdataInstance-directive', ['cesgaBDApp.components.endpoints.bigdata', 'cesgaBDApp.components.endpoints.bigdata.nodes'])

.directive('bigdataInstance', ['BigdataService', 'NodesServiceBigdata' ,function(BigdataService, NodesServiceBigdata) {
  return {
    templateUrl:'components/bigdata/bigdata.html',
    restrict: 'E',
    replace: true,
    scope: {
      bigdataInstanceData: '=',
      showDetails: '@'
    },
    link: function(scope, element, attrs) {
      var vmCluster = scope;

      vmCluster.bigdataInstanceData.vms = [];
      vmCluster.showDetails = 'false';


      vmCluster.toggleDetails = function() {
        if(vmCluster.showDetails == 'false') {
          NodesServiceBigdata.listClusterNodes(
              vmCluster.bigdataInstanceData.service_type,
              vmCluster.bigdataInstanceData.service_name,
              vmCluster.bigdataInstanceData.instance_id
            ).success(function (data){
              vmCluster.showDetails = 'true';
            vmCluster.bigdataInstanceData.vms = data.nodes;
          }).error(function (data){
              alert("Couldn't retrieve the nodes info.")
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
        
        BigdataService.remove(
            vmCluster.bigdataInstanceData.service_type,
            vmCluster.bigdataInstanceData.service_name,
            vmCluster.bigdataInstanceData.instance_id
            ).success(function (data){
          vmCluster.onClusterServiceRemoveSuccess(data);
        }).error(function (data){
          vmCluster.onClusterServiceRemoveError(data);
        });
      };
    },
  };
}]);
