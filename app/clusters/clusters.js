'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.clusters:ClustersCtrl
 * @description 
 * # ClustersCtrl
 * Controller of the clusters view 
 * Allows to see active clusters and to launch new clusters
 */
angular.module('hadoopApp.clusters', ['ui.router','ui.bootstrap', 'hadoopApp.notifications', 'hadoopApp.cluster', 'hadoopApp.service.clusters'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('clusters', {
    url:'/clusters',
    templateUrl: 'clusters/clusters.html',
    controller: 'ClustersCtrl',
    controllerAs: 'clusters',
    data: {
        requireLogin: true
    }
  });
}])

.controller('ClustersCtrl', 
            ['ClusterService', '$log', '$state', '$uibModal', function(ClusterService, $log, $state,$uibModal) {

  var vm = this;

  vm.clusters = [];

  activate();

  vm.launchClusterWizard = function() {
    //$state.go('launcher');


      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'clusters/partials/wizard.html',
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
          size: data.clusterSize,
          dfsReplicas: data.HDFSreplicas,
          dfsBlocksize: data.HDFSblocksize,
          clustername: data.clusterName
        };

        ClusterService.create(options)    
          .then(function(success) {
            activate();
          }).catch(function(error) {
            if(error.status == 409){
              alert('You have exceeded the number of nodes allowed.');
              vm.errorMessage = 'You have exceeded the number of nodes allowed';
              $log.info('Status: ' + error.status);
            }
              vm.errorMessage = 'You have exceeded the number of nodes allowed';
              $log.info('Status: ' + error.status);
          })
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    

  };

  function activate() {
    return ClusterService.list()
      .then(function(data){
        vm.clusters = data.data;
      })
      .catch(function(error) {
        vm.errorMessage = 'Unable to connect to the Big Data service';
        $log.info('Status: ' + error.status);
        $log.info('Error message: '+ error.data.message);
      });
  }
}]);


angular.module('hadoopApp.launcher', ['ui.router','ui.bootstrap'])

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
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
