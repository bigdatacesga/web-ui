'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.bigdataInstance.bigdataInstance-directive:bigdataInstance
 * @description
 * # stats
 */
angular.module('cesgaBDApp.bigdataPaasService.bigdataPaasService-directive', ['cesgaBDApp.components.endpoints.bigdata', 'cesgaBDApp.components.endpoints.bigdata.nodes'])

.directive('bigdataPaasService', ['BigdataService' ,function(BigdataService) {
  return {
    templateUrl:'components/bigdataPaasService/bigdataPaasService.html',
    restrict: 'E',
    replace: true,
    scope: {
      bigdataPaasServiceData: '=',
      showDetails: '@'
    },
    link: function(scope, element, attrs) {
      var vmCluster = scope;
      vmCluster.bigdataInstanceData.versions = [];
      vmCluster.services = [{"name": "test"},{"name": "test2"}]
    },
  };
}]);
