'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.bigdata_services:BigdataCtrl
 * @description 
 * # BigdataCtrl
 * Controller of the clusters view 
 * Allows to see active clusters
 */
angular.module('cesgaBDApp.bigdata_instances', ['ui.router','ui.bootstrap', 'cesgaBDApp.notifications', 'cesgaBDApp.bigdatainstance', 'cesgaBDApp.paasservice', 'cesgaBDApp.components.endpoints.bigdata'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('bigdata_instances', {
    url:'/bigdata_instances',
    templateUrl: 'bigdata_instances/bigdata_instances.html',
    controller: 'BigdataInstancesCtrl',
    controllerAs: 'bigdata_instances',
    data: {
        requireLogin: true
    }
  });
}])

.controller('BigdataInstancesCtrl',
            ['BigdataService', '$log', '$state', '$uibModal', function(BigdataService, $log) {


  var vm = this;

  //CONSTANTS
  var BackendDownMessage = 
    "Sorry :( , it seems we could not launch the service, the server may be down.";

  vm.clusters = [];
  vm.endpoint = BigdataService;

  function handleBackendDown(message, status, error){
    if(message != undefined) {
      alert(message);
    }
    if(message != undefined) {$log.info('Message: ' + message);}
    if(status != undefined) {$log.info('Status: ' + status);}
    if(error != undefined) {$log.info('Error: ' + error);}
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
          var clusters = [];
          for (var index in receivedData.clusters){
            var instanceUri = receivedData.clusters[index].uri
            var instanceName = ""
            var instanceStatus = ""
            if (receivedData.clusters[index].result == "success"){
              instanceName = receivedData.clusters[index].data.name
              instanceStatus = receivedData.clusters[index].data.status
            }
            clusters.push({
              "uri" : instanceUri,
              "name" : instanceName,
              "status" : instanceStatus,
              "product": instanceUri.split("/")[2],
              "version": instanceUri.split("/")[3],
              "id": instanceUri.split("/")[4]
            })
          }
          vm.clusters = clusters;
        }      
      }).catch(function(error) {
        //ERROR
        handleBackendDown(BackendDownMessage, data.status, error.data.message);
      });
  }
  //Call function to draw the data on the interface
  vm.drawInstances();

}]);
