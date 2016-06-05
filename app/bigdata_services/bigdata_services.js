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
            ['BigdataService', '$log', '$state', '$uibModal', function(BigdataService, $log, $state, $uibModal) {


  var vm = this;

  //CONSTANTS
  var BackendDownMessage = 
    "Sorry :( , it seems we could not launch the service, the server may be down.";
  var ExceededNumberOfNodes =
    "Sorry, it seems you have exceeded the number of nodes allowed.";
  var UnknownError =
    "There was an unkwnown error in the backend, how scary..."
  var TypeOfService_Multi = "multi";

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

  // LAUNCH NEW SERVICE
  vm.launchInstanceWizard = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'bigdata_services/partials/wizard.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: 'modal',
        resolve: {
          items: function () {
            return vm.items;
          }
        }
      });

      modalInstance.result.then(function (data) {
        vm.clusterDetails = data;
        vm.errorMessage = 'Launching cluster';

        var options = { 
          service_type : TypeOfService_Multi,
          service_name : data.ServiceName,
          num_nodes: parseInt(data.clusterSize),
          mem: parseInt(data.NodeMemory),
          cpu: parseInt(data.NodeCpus),
          disks: parseInt(data.NodeDisks),
          clustername: data.clusterName
        };

        vm.endpoint.create(options)    
          .then(function(success) {
              if(success.data == undefined){
                //ERROR
                handleBackendDown(BackendDownMessage);
              }else{
                if(success.status != 200){
                  //ERROR
                  handleBackendDown(BackendDownMessage, success.status);
                }else{
                  //SUCCESS
                  vm.activate();
                }
              }
          }).catch(function(error) {
            //ERROR
            if(error.status == 409){
              handleBackendDown(ExceededNumberOfNodes, error.status, error.data.message);
            }
            handleBackendDown(UnknownError, error.status, error.data.message);
          })
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
  };

  //DRAW SERVICES
  vm.drawServices = function($timeout) {
    var receivedData;
    return vm.endpoint.listServices()
      .then(function(data){
        var receivedData = data.data;
        if(receivedData == undefined){
          //ERROR
          handleBackendDown(BackendDownMessage, data.status);
        }else{
          //SUCCESS
          var services = [];
          for (var index in receivedData.services){
            var serviceName = receivedData.services[index]
            services.push({
              "name" : serviceName
            })
          }
          vm.services = services;

        }      
      }).catch(function(error) {
        //ERROR
        handleBackendDown(BackendDownMessage, data.status, error.data.message);
      });
  }

  //Call function to draw the data on the interface
  vm.drawServices();
  //vm.services = [{"name": "test"},{"name": "test2"}]

  // //DRAW INSTANCES
  vm.drawInstances = function($timeout) {
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
            var instanceName = receivedData.instances[index]
            instances.push({
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
  vm.drawInstances();

}]);


angular.module('cesgaBDApp.launcher.bigdata', ['ui.router','ui.bootstrap'])

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
  var modal = this;

  modal.steps = ['one', 'two', 'three'];
  modal.step = 0;
  modal.wizard = {
    clusterName: "My Slurm Cluster",
    clusterSize: 2,
    ServiceName: "Slurm",
    NodeCpus : "2",
    NodeMemory: "1024",
    NodeDisks: "1"
  };

  modal.isFirstStep = function () {
      return modal.step === 0;
  };

  modal.isLastStep = function () {
      return modal.step === (modal.steps.length - 1);
  };

  modal.isCurrentStep = function (step) {
      return modal.step === step;
  };

  modal.setCurrentStep = function (step) {
      modal.step = step;
  };

  modal.getCurrentStep = function () {
      return modal.steps[modal.step];
  };

  modal.getNextLabel = function () {
      return (modal.isLastStep()) ? 'Submit' : 'Next';
  };

  modal.handlePrevious = function () {
      modal.step -= (modal.isFirstStep()) ? 0 : 1;
  };

  modal.handleNext = function () {
      if (modal.isLastStep()) {
          $uibModalInstance.close(modal.wizard);
      } else {
          modal.step += 1;
      }
  };

  modal.dismiss = function(reason) {
      $uibModalInstance.dismiss(reason);
  };
});
