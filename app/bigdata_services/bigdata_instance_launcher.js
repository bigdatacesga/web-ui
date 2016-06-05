angular.module('cesgaBDApp.launcher.bigdata', ['ui.router','ui.bootstrap'])

.controller('ModalInstanceCtrlBigdata', function ($scope, $uibModalInstance, serviceInfo) {
  var modal = this;
  modal.serviceInfo = serviceInfo;
  modal.dismiss = function(reason) {
      $uibModalInstance.dismiss(reason);
  };

});