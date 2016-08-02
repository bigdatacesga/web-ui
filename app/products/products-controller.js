'use strict';
/**
 * @ngdoc function
 * @name bigdata.products:ProductsCtrl
 * @description 
 * # ProductsCtrl
 * Controller of the products view 
 * Allows to explore existing products
 */
angular.module('bigdata.products', ['ui.router','ui.bootstrap', 'bigdata.components.product', 'bigdata.services.paas'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('products', {
    url: '/products',
    templateUrl: 'products/products.html',
    controller: 'ProductsCtrl',
    controllerAs: 'products',
    data: {
        requireLogin: true
    }
  });
}])

.controller('ProductsCtrl', 
            ['PaasService', '$log', '$state', '$uibModal', function(PaasService, $log) {


  var vm = this;

  //CONSTANTS
  var BackendDownMessage = 
    'Sorry :( , it seems we could not launch the service, the server may be down.';

  vm.products = [];
  vm.endpoint = PaasService;

  function handleBackendDown(message, status, error){
    if(message != undefined) {
      alert(message);
    }
    if(message != undefined) {$log.info('Message: ' + message);}
    if(status != undefined) {$log.info('Status: ' + status);}
    if(error != undefined) {$log.info('Error: ' + error);}
  }

  var ImagesMap = {
    "gluster": "'assets/images/gluster-icon.png'",
    "mpi" : "'assets/images/mpi-icon.png'"
  }

  //DRAW SERVICES
  vm.drawServices = function() {
    var receivedData;
    return vm.endpoint.listServices()
      .then(function(data){
        var receivedData = data.data;
        if(receivedData == undefined){
          //ERROR
          handleBackendDown(BackendDownMessage, data.status);
        }else{
          //SUCCESS
          var products = [];
          for (var index in receivedData.products){
            var serviceName = receivedData.products[index]
            products.push({
              "name" : serviceName,
              "image_url" : ImagesMap[serviceName]
            })
          }
          vm.products = products;
        }      
      }).catch(function(error) {
        //ERROR
        handleBackendDown(BackendDownMessage, data.status, error.data.message);
      });
  }
  //Call function to draw the data on the interface
  vm.drawServices();

}]);
