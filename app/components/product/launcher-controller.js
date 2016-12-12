(function() {

  'use strict';

  var app = angular.module('bigdata.components.product.launcher', ['bigdata.services.logger', 'ui.bootstrap', 'ui.router']);

  app.controller('LauncherCtrl', ['$state', '$scope', '$uibModalInstance', 'logger', 'serviceInfo', 'PaasService', LauncherCtrl]);

  function LauncherCtrl($state, $scope, $uibModalInstance, logger, serviceInfo, PaasService) {
    var modal = this;
    modal.serviceInfo = serviceInfo;

    modal.serviceToLaunch = {};
    modal.serviceToLaunch.options = {};
    modal.serviceToLaunch.options.optional = {};
    modal.serviceToLaunch.options.required = {};
    angular.copy(modal.serviceInfo, modal.serviceToLaunch);

    modal.dismiss = function(reason) {
      $uibModalInstance.dismiss(reason);
    };


    modal.submitForm = function(){
      logger.debug(modal.serviceInfo.options.optional);
      logger.debug(modal.serviceInfo.options.required);
      logger.debug(modal.serviceToLaunch.options.optional);
      logger.debug(modal.serviceToLaunch.options.required);

      var obj = modal.serviceToLaunch.options.optional;
      for(var key in obj){
        var attrValue = obj[key];
        modal.serviceToLaunch.options.required[key] = attrValue;
      }
      PaasService.launchInstance(modal.serviceToLaunch.options.required, modal.serviceToLaunch.name, modal.serviceToLaunch.version).success(function (data){
        alert('Instance was submitted.');
        $state.go('clusters');
      }).error(function (data){
        alert('Error submitting cluster');
        logger.error('Error submitting cluster');
        logger.error(data);
      });
    };
  }
})();
