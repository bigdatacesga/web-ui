'use strict';

/**
 * @ngdoc directive
 * @name bigdata.bigdataInstance.bigdataInstance-directive:bigdataInstance
 * @description
 * # stats
 */
angular.module('bigdata.paasservice.paasservice-directive', ['bigdata.services.bigdata', 'bigdata.services.bigdata.nodes'])

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

      BigdataService.showServiceVersions(vmService.paasserviceData.name)
      .success(function (data){
        for (var v in data.versions){
            BigdataService.showService(vmService.paasserviceData.name, data.versions[v])
            .success(function (data, status){
              if (status == 200){
                var newService = {
                  "description": data.description,
                  "name": data.name,
                  "version": data.version
                  //"options": JSON.parse(data.options)
                }
                vmService.paasserviceData.versions.push(newService)
                //TODO: Select the highest version instead of the first one
                //vmService.paasserviceData.selectedVersion = vmService.paasserviceData.versions[0];
              } else {
                // Skip this service-version
              }
            })
            .error(function (data){
               alert('Could not get the service info');
            });
        }
      })
      .error(function (data){
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
            templateUrl: 'components/product/partials/launch.html',
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
