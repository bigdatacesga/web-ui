'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.bigdataInstance.bigdataInstance-directive:bigdataInstance
 * @description
 * # stats
 */
angular.module('cesgaBDApp.paasservice.paasservice-directive', ['cesgaBDApp.components.endpoints.bigdata', 'cesgaBDApp.components.endpoints.bigdata.nodes'])

.directive('paasservice', ['BigdataService', '$uibModal' ,function(BigdataService, $uibModal) {
  return {
    templateUrl:'components/paasservice/paasservice.html',
    restrict: 'E',
    replace: true,
    scope: {
      paasserviceData: '=',
      showDetails: '@'
    },
    link: function(scope, element, attrs) {
      var vmService = scope;
      

      vmService.paasserviceData.versions = [];

      BigdataService.showServiceVersions(vmService.paasserviceData.name).success(function (data){
        for (var v in data.versions){
            BigdataService.showService(vmService.paasserviceData.name, data.versions[v]).success(function (data, status){
              if (status == 200){
                var newService = {
                  "description": data.description,
                  "name": data.name,
                  "version": data.version
                  //"options": JSON.parse(data.options)
                }
                vmService.paasserviceData.versions.push(newService)
              }else{
                // Skip this service-version
              }
            }).error(function (data){
               alert('Could not get the service info');
            });
        }
      }).error(function (data){
         alert('Could not get the version');
      });

      vmService.launchInstance = function(index) {
        var product = vmService.paasserviceData.versions[index]
        BigdataService.getProductOptions(vmService.paasserviceData.name, vmService.paasserviceData.versions[index].version).success(function (data){
          product.options = {}
          product.options.required = data.required //{}
          product.options.optional = data.optional //{"size": 2}
          product.options.advanced = data.advanced //{}
          product.options.descriptions = data.descriptions //{"size": "number of worker nodes"}



          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'bigdata_services/partials/launch.html',
            controller: 'ModalInstanceCtrlBigdata',
            controllerAs: 'modal',
            size: 'lg',
            resolve: {
              serviceInfo: function () {
                return vmService.paasserviceData.versions[index];
              }
            }
          });
        }).error(function (data){
          alert('Could not get the product options');
        });
      };
    },
  };
}]);
