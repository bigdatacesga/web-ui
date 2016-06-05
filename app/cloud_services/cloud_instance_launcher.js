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