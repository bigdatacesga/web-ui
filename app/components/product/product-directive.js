'use strict';

/**
 * @ngdoc directive
 * @name bigdata.components.product
 * @description
 * # product
 * Directive to display a Big Data Product
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
      vmService.productData.selectedVersion = null;
      
      PaasService.showServiceVersions(vmService.productData.name)
        .success(function (data) {
          for (var v in data.versions) {
              PaasService.showService(vmService.productData.name, data.versions[v])
                .success(function (data, status){
                    var newService = {
                      'description': data.description,
                      'name': data.name,
                      'version': data.version
                      //'options': JSON.parse(data.options)
                    };
                    vmService.productData.versions.push(newService);
                    //TODO: Select the highest version instead of the first one
                    if (vmService.productData.selectedVersion === null)
                      vmService.productData.selectedVersion = newService;
                })
                .error(function (data){
                   alert('Could not get the service info');
                });
          }
          //vmService.productData.selectedVersion = data.versions[0];
        })
        .error(function (data){
           alert('Could not get the version');
        });

      vmService.launchInstance = function(product) {
        PaasService.getProductOptions(product.name, product.version).success(function (data){
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
                return product;
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
