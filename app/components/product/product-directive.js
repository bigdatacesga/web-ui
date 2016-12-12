/**
 * @ngdoc directive
 * @name bigdata.components.product
 * @description
 * # product
 * Directive to display a Big Data Product
 */
(function() {
  'use strict';
  var app = angular.module('bigdata.components.product', ['bigdata.services.logger', 'bigdata.components.product.launcher', 'bigdata.services.paas', 'ui.bootstrap']);

  app.directive('product', ['logger', 'PaasService', '$uibModal', ProductDirective]);

  function ProductDirective(logger, PaasService, $uibModal) {
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

        vmService.productData.loading = true;

        PaasService.showServiceVersions(vmService.productData.name)
          .then(getProductVersionsComplete)
          .catch(getProductVersionsFailed);

        function getProductVersionsComplete(response) {
          var versions = response.data.versions;
          for (var v in versions) {
            PaasService.showService(vmService.productData.name, versions[v])
              .then(showProductComplete)
              .catch(showProductFailed);
          }
          //vmService.productData.selectedVersion = versions[0];
        }

        function getProductVersionsFailed(response) {
          alert('Could not get the versions');
          logger.error('Failed to retrieve the versions of product from the PaaS service');
          logger.debug(response.status);
          logger.debug(response.data);
          return $q.reject(response);
        }

        function showProductComplete(response){
          var product = response.data;
          var newService = {
            'description': product.description,
            'name': product.name,
            'version': product.version,
            'dn': product.dn,
            'logo_url': product.logo_url
          };
          vmService.productData.versions.push(newService);
          //TODO: Select the highest version instead of the first one
          if (vmService.productData.selectedVersion === null)
            vmService.productData.selectedVersion = newService;
          vmService.productData.loading = false;
        }

        function showProductFailed(response) {
          alert('Could not get the product info details');
          logger.error('Failed to retrieve the product details from the PaaS service');
          logger.debug(response.status);
          logger.debug(response.data);
          return $q.reject(response);
        }

        vmService.launchInstance = function(product) {
          PaasService.getProductOptions(product.name, product.version).success(function (data){
            product.options = {};
            product.options.required = data.required;
            product.options.optional = data.optional;
            product.options.advanced = data.advanced;
            product.options.descriptions = data.descriptions;
            
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
      }
    };
  }
})();
