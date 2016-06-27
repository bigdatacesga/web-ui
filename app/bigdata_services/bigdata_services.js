'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.bigdata_services:BigdataCtrl
 * @description 
 * # BigdataCtrl
 * Controller of the clusters view 
 * Allows to see active clusters and to launch new clusters
 */
angular.module('cesgaBDApp.bigdata_services', ['ui.router','ui.bootstrap', 'cesgaBDApp.notifications', 'cesgaBDApp.bigdatainstance', 'cesgaBDApp.paasservice', 'cesgaBDApp.components.endpoints.bigdata'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('bigdata_services', {
    url:'/bigdata',
    templateUrl: 'bigdata_services/bigdata_services.html',
    controller: 'BigdataCtrl',
    controllerAs: 'bigdata_services',
    data: {
        requireLogin: true
    }
  });
}])

.controller('BigdataCtrl', 
            ['BigdataService', '$log', '$state', '$uibModal', function(BigdataService, $log) {


  var vm = this;

  //CONSTANTS
  var BackendDownMessage = 
    "Sorry :( , it seems we could not launch the service, the server may be down.";

  vm.services = [];
  vm.instances = [];
  vm.endpoint = BigdataService;

  function handleBackendDown(message, status, error){
    if(message != undefined) {
      alert(message);
    }
    if(message != undefined) {$log.info('Message: ' + message);}
    if(status != undefined) {$log.info('Status: ' + status);}
    if(error != undefined) {$log.info('Error: ' + error);}
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
              "name" : serviceName
            })
          }
          vm.products = products;
        }      
      }).catch(function(error) {
        //ERROR
        handleBackendDown(BackendDownMessage, data.status, error.data.message);
      });
  }

  // //DRAW INSTANCES
  vm.drawInstances = function() {
    var receivedData;
    return vm.endpoint.listInstances("jenes",null,null)
      .then(function(data){
        receivedData = data.data;
        if(receivedData == undefined){
          //ERROR
          handleBackendDown(BackendDownMessage, data.status);
        }else{
          //SUCCESS
          var instances = [];
          for (var index in receivedData.instances){
            var instanceUri = receivedData.instances[index].uri
            var instanceName = receivedData.instances[index].uri
            if (receivedData.instances[index].result == "success"){
              instanceName = receivedData.instances[index].data.instance_name
            }
            instances.push({
              "uri" : instanceUri,
              "name" : instanceName
            })
          }
          vm.instances = instances;
        }      
      }).catch(function(error) {
        //ERROR
        handleBackendDown(BackendDownMessage, data.status, error.data.message);
      });
  }
              
  //Call function to draw the data on the interface
  vm.drawServices();
  //Call function to draw the data on the interface
  vm.drawInstances();

}]);
