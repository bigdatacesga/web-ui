'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.bigdata_services:BigdataCtrl
 * @description 
 * # BigdataCtrl
 * Controller of the clusters view 
 * Allows to see active clusters
 */
angular.module('cesgaBDApp.bigdata_instances', ['ui.router','ui.bootstrap', 'cesgaBDApp.notifications', 'cesgaBDApp.paasservice', 'cesgaBDApp.components.endpoints.bigdata'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('bigdata_instances', {
    url:'/bigdata_instances',
    templateUrl: 'bigdata_instances/bigdata_instances.html',
    controller: 'BigdataInstancesCtrl',
    controllerAs: 'instances',
    data: {
        requireLogin: true
    }
  });
}])

.controller('BigdataInstancesCtrl',
            ['BigdataService', '$log', '$uibModal', function(BigdataService, $log, $uibModal) {


  var vm = this;

  //CONSTANTS
  var BackendDownMessage = 
    "Sorry :( , it seems we could not launch the service, the server may be down.";

  vm.clustersActive = [];
  vm.clustersInactive = [];
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
    var username = window.sessionStorage.username;
    return vm.endpoint.listInstances(username,null,null)
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
            if (instanceStatus != "destroyed" && instanceStatus != "error during configuration") {
              vm.clustersActive.push({
                "uri": instanceUri,
                "name": instanceName,
                "status": instanceStatus,
                "product": instanceUri.split("/")[2],
                "version": instanceUri.split("/")[3],
                "id": instanceUri.split("/")[4]
              })
            }else{
              vm.clustersInactive.push({
                "uri": instanceUri,
                "name": instanceName,
                "status": instanceStatus,
                "product": instanceUri.split("/")[2],
                "version": instanceUri.split("/")[3],
                "id": instanceUri.split("/")[4]
              })
            }
          }
        }      
      }).catch(function(error) {
        //ERROR
        handleBackendDown(BackendDownMessage, data.status, error.data.message);
      });
  }

  vm.toggleDetails = function(index, table){
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'bigdata_instances/partials/details.html',
      controller: 'ModalInstanceDetailsCtrlBigdata',
      controllerAs: 'modal',
      size: 'lg',
      resolve: {
        instanceInfo: function () {
          if (table == "active"){
            return vm.clustersActive[index];
          }
          if (table == "inactive"){
            return vm.clustersInactive[index];
          }
        }
      }
    });
  };

  vm.destroyInstance = function(index) {

    BigdataService.destroyInstance(vm.clustersActive[index].uri).success(function (data){
      alert('Instance was destroyed.');
      vm.clustersActive[index].status = "destroyed"
      //$location.path('bigdata_instances')
      //$route.reload();
      location.reload();
    }).error(function (data){
      alert('Could not destroy instance');
    });



  };

  //Call function to draw the data on the interface
  vm.drawInstances();

}]);
