/**
 * @ngdoc function
 * @name bigdata.products:ProductsCtrl
 * @description 
 * # ProductsCtrl
 * Controller of the products view 
 * Allows to explore existing products
 */
(function() {

  'use strict';

  var app = angular.module('bigdata.products', ['bigdata.services.logger', 'ui.router','ui.bootstrap', 'bigdata.components.product', 'bigdata.services.paas']);

  app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('products', {
      url: '/products',
      templateUrl: 'products/products.html',
      controller: 'ProductsCtrl',
      controllerAs: 'products',
      data: {
          requireLogin: true
      }
    });
  }]);

  app.controller('ProductsCtrl', ['PaasService', 'logger', '$q', ProductsCtrl]); 

  function ProductsCtrl(PaasService, logger, $q) {

    var vm = this;

    vm.products = [];

    vm.loading = true;

    activate();

    function activate() {
      var data = loadData();
      return data;
    }

    function loadData() {
      vm.loading = true;
      return PaasService.listProducts()
        .then(getProductsComplete)
        .catch(getProductsFailed);
    }

    function getProductsComplete(data){
      var products = data.data.products;
      for (var i = 0; i < products.length; i++) {
        var product = products[i];
        addProduct(product);
      }
      vm.loading = false;
    }

    function addProduct(product) {
      vm.products.push({'name': product});
    }

    function getProductsFailed(error) {
      logger.error('Failed to retrieve the list of products from the PaaS service');
      logger.debug(error.status);
      logger.debug(error.data.message);
      return $q.reject(error);
    }
  }

})();
