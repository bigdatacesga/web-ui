'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.bigdataInstance.bigdataInstance-directive:bigdataInstance
 * @description
 * # stats
 */
angular.module('cesgaBDApp.bigdatainstance.bigdatainstance-directive', ['cesgaBDApp.components.endpoints.bigdata', 'cesgaBDApp.components.endpoints.bigdata.nodes'])

.directive('bigdatainstance', ['BigdataService', '$uibModal', function(BigdataService, $uibModal) {
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
        
      vmInstance.toggleDetails = function() {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'bigdata_instances/partials/details.html',
            controller: 'ModalInstanceDetailsCtrlBigdata',
            controllerAs: 'modal',
            size: 'lg',
            resolve: {
              instanceInfo: function () {
                return vmInstance.bigdatainstanceData;
              }
            }
          });
      };

      vmInstance.destroyInstance = function(index) {

          BigdataService.destroyInstance(vmInstance.bigdatainstanceData.uri).success(function (data, status){
          if (status == 200){
            // OK
          }else{
            // Skip this service-version
          }
        }).error(function (data){
          alert('Could not destroy instance');
        });

      };
    },
  };
}]);
