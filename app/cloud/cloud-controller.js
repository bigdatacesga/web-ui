'use strict';
/**
 * @ngdoc function
 * @name bigdata.cloudview:CloudCtrl
 * @description 
 * # CloudCtrl
 * Controller of the cloud view 
 * Allows to see active clusters and to launch new clusters
 */
angular.module('bigdata.cloudview', ['ui.router','ui.bootstrap', 'bigdata.notifications', 'bigdata.cloud', 'bigdata.services.cloud'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('cloud', {
    url:'/cloud',
    templateUrl: 'cloud/cloud.html',
    controller: 'CloudCtrl',
    controllerAs: 'cloud',
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
    "Sorry :( , it seems we could not launch the service, the server may be down.";
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
        templateUrl: 'cloud/partials/wizard.html',
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
