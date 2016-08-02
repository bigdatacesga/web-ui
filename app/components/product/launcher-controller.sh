(function() {
  'use strict';

  angular.module('bigdata.components.product.launcher', ['ui.router','ui.bootstrap'])

  .controller('LauncherCtrl', function ($scope, $uibModalInstance, $log, $state, $location, serviceInfo, PaasService) {
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
      $log.debug(modal.serviceInfo.options.optional);
      $log.debug(modal.serviceInfo.options.required);
      $log.debug(modal.serviceToLaunch.options.optional);
      $log.debug(modal.serviceToLaunch.options.required);


      var obj = modal.serviceToLaunch.options.optional
      for(var key in obj){
        var attrValue = obj[key];
        modal.serviceToLaunch.options.required[key] = attrValue
      }
      PaasService.launchInstance(modal.serviceToLaunch.options.required, modal.serviceToLaunch.name, modal.serviceToLaunch.version).success(function (data, $state){
        alert('Instance was submitted.');
        $location.path('bigdata_instances')
      }).error(function (data){

      });
    }
  });
})();
