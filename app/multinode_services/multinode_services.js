'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.multinode_services:MultinodeCtrl
 * @description 
 * # MultinodeCtrl
 * Controller of the clusters view 
 * Allows to see active clusters and to launch new clusters
 */
angular.module('cesgaBDApp.multinode_services', ['ui.router','ui.bootstrap', 'cesgaBDApp.notifications', 'cesgaBDApp.multinode', 'cesgaBDApp.components.endpoints.multinodes'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('multinode_services', {
    url:'/multinode',
    templateUrl: 'multinode_services/multinode_services.html',
    controller: 'MultinodeCtrl',
    controllerAs: 'multinode_services',
    data: {
        requireLogin: true
    }
  });
}])

.controller('MultinodeCtrl', 
            ['MultinodeService', '$log', '$state', '$uibModal', function(MultinodeService, $log, $state, $uibModal) {

  var vm = this;

  vm.services = [];

  activate();

  vm.launchClusterWizard = function() {
    //$state.go('launcher');


      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'multinode_services/partials/wizard.html',
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
          service_type : "multi",
          num_nodes: parseInt(data.clusterSize),
          service_name : data.ServiceName,
          mem: parseInt(data.NodeMemory),
          cpu: parseInt(data.NodeCpus),
          clustername: data.clusterName
        };

        MultinodeService.create(options)    
          .then(function(success) {
            activate();
          }).catch(function(error) {
            if(error.status == 409){
              alert('You have exceeded the number of nodes allowed.');
              vm.errorMessage = 'You have exceeded the number of nodes allowed';
              $log.info('Status: ' + error.status);
            }
            $log.info('Status: ' + error.status);
          })
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    

  };

  function activate() {
    return MultinodeService.list("multi")
      .then(function(data){
        vm.services = data.data.services;
      })
      .catch(function(error) {
        vm.errorMessage = 'Unable to connect to the Big Data service';
        $log.info('Status: ' + error.status);
        $log.info('Error message: '+ error.data.message);
      });
  }
}]);


angular.module('cesgaBDApp.launcher.multinode', ['ui.router','ui.bootstrap'])

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
  var modal = this;

  modal.steps = ['one', 'two', 'three'];
  modal.step = 0;
  modal.wizard = {
    clusterName: "My Slurm Cluster",
    clusterSize: 2,
    ServiceName: "Slurm",
    NodeCpus : "2",
    NodeMemory: "1024"

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
