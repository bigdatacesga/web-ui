'use strict';

/**
 * @ngdoc directive
 * @name bigdata.components.product
 * @description
 * # stats
 */
angular.module('bigdata.components.product', ['bigdata.components.product.launcher', 'bigdata.services.paas', 'ui.bootstrap'])

.directive('product', ['PaasService', '$uibModal' ,function(PaasService, $uibModal) {
  return {
    templateUrl: 'components/product/product.html',
    restrict: 'E',
    replace: true,
    scope: {
      productData: '=',
      showDetails: '@'
    },
    link: function(scope, element, attrs) {
      var vmService = scope;
      
      vmService.productData.versions = [];

      PaasService.showServiceVersions(vmService.productData.name)
        .success(function (data){
          for (var v in data.versions){
              PaasService.showService(vmService.productData.name, data.versions[v])
                .success(function (data, status){
                  if (status == 200){
                    var newService = {
                      "description": data.description,
                      "name": data.name,
                      "version": data.version
                      //"options": JSON.parse(data.options)
                    }
                    vmService.productData.versions.push(newService)
                    //TODO: Select the highest version instead of the first one
                    //vmService.productData.selectedVersion = vmService.productData.versions[0];
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
        var product = vmService.productData.versions[index]
        PaasService.getProductOptions(vmService.productData.name, vmService.productData.versions[index].version).success(function (data){
          product.options = {}
          product.options.required = data.required //{}
          product.options.optional = data.optional //{"size": 2}
          product.options.advanced = data.advanced //{}
          product.options.descriptions = data.descriptions //{"size": "number of worker nodes"}
          
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/product/partials/launcher.html',
            controller: 'LauncherCtrl',
            controllerAs: 'modal',
            size: 'lg',
            resolve: {
              serviceInfo: function () {
                return vmService.productData.versions[index];
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
