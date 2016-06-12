'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.bigdataInstance.bigdataInstance-directive:bigdataInstance
 * @description
 * # stats
 */
angular.module('cesgaBDApp.bigdatainstance.bigdatainstance-directive', ['cesgaBDApp.components.endpoints.bigdata', 'cesgaBDApp.components.endpoints.bigdata.nodes'])

.directive('bigdatainstance', ['BigdataService',function(BigdataService) {
  return {
    templateUrl:'components/bigdatainstance/bigdatainstance.html',
    restrict: 'E',
    replace: true,
    scope: {
      bigdatainstanceData: '=',
      showDetails: '@'
    },
    link: function(scope, element, attrs) {
      var vmInstance = scope;

      vmInstance.bigdatainstanceData.showDetails = 'false';

      vmInstance.toggleDetails = function() {
        if(vmInstance.bigdatainstanceData.showDetails == 'false') {


          BigdataService.showInstance(vmInstance.bigdatainstanceData.uri).success(function (data){
            vmInstance.bigdatainstanceData.nodes = data.data.nodes
            vmInstance.bigdatainstanceData.uri = data.data.uri
            vmInstance.showDetails = 'true';
          }).error(function (data){
             alert('Could not get the version');
             vmInstance.showDetails = 'true';
          });


          vmInstance.bigdatainstanceData.showDetails = 'true';
          
        } else {
          vmInstance.bigdatainstanceData.showDetails = 'false';
        }
      };
      vmInstance.isCollapsed = function() {
          return vmInstance.bigdatainstanceData.showDetails == 'false';
      };
    },
  };
}]);
