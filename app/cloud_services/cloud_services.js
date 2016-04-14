'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.clusters:ClustersCtrl
 * @description 
 * # ClustersCtrl
 * Controller of the clusters view 
 * Allows to see active clusters and to launch new clusters
 */
angular.module('cesgaBDApp.cloud_services', ['ui.router','ui.bootstrap', 'cesgaBDApp.notifications', 'cesgaBDApp.cloud', 'cesgaBDApp.components.endpoints.cloud'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('cloud_services', {
    url:'/cloud',
    templateUrl: 'cloud_services/cloud_services.html',
    controller: 'CloudCtrl',
    controllerAs: 'cloud_services',
    data: {
        requireLogin: true
    }
  });
}])

.controller('CloudCtrl', 
            ['CloudService', '$log', '$state', '$uibModal', function(CloudService, $log, $state, $uibModal) {

  var vm = this;

  //CONSTANTS
  var BackendDownMessage = 
    "Sorry :( , it seems we could not launcch the service, the server may be down.";
  var ExceededNumberOfNodes =
    "Sorry, it seems you have exceeded the number of nodes allowed.";
  var UnknownError =
    "There was an unkwnown error in the backend, how scary..."
  var TypeOfService_Multi = "multi";

  vm.services = [];
  vm.endpoint = CloudService;


  function handleBackendDown(message, status, error){
    if(message != undefined) {
      alert(message);
    }
    if(message != undefined) {$log.info('Message: ' + message);}
    if(status != undefined) {$log.info('Status: ' + status);}
    if(error != undefined) {$log.info('Error: ' + error);}
  }


  vm.launchClusterWizard = function() {
    
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'cloud_services/partials/wizard.html',
        controller: 'ModalInstanceCtrlCloud',
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
          size: data.clusterSize,
          dfsReplicas: data.HDFSreplicas,
          dfsBlocksize: data.HDFSblocksize,
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

  vm.activate = function() {
    var receivedData, errMessage;
    return vm.endpoint.list()
      .then(function(data){
        if(data.status == '500'){
            //ERROR
            //HOT FIX, try to solve in the rest api
            if(data.exception = "org.springframework.expression.spel.SpelEvaluationException"){
              vm.errorMessage = 'Unable to retrieve info from backend, try login in again.';
              alert(vm.errorMessage);
              $state.go('login');
            }else{
              handleBackendDown(BackendDownMessage, data.status);
              vm.services = [];
            }
        }else{
          receivedData = data.data;
          if (receivedData == undefined){
            //ERROR
            handleBackendDown(BackendDownMessage, data.status);
            vm.services = [];
          }else{
            //SUCCESS
            vm.services = data.data;
          }
        }
      })
      .catch(function(error) {
        handleBackendDown(BackendDownMessage, error.status, error.data.message);
      });
  }

  //Call function to draw the data on the interface
  vm.activate();
}]);


angular.module('cesgaBDApp.launcher.cloud', ['ui.router','ui.bootstrap'])

.controller('ModalInstanceCtrlCloud', function ($scope, $uibModalInstance, items) {
  var modal = this;

  modal.steps = ['one', 'two', 'three'];
  modal.step = 0;
  modal.wizard = {
    clusterName: "test",
    clusterSize: 2,
    HDFSblocksize: "64",
    HDFSreplicas : "2"
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
