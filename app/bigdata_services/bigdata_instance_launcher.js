angular.module('cesgaBDApp.launcher.bigdata', ['ui.router','ui.bootstrap'])

.controller('ModalInstanceCtrlBigdata', function ($scope, $uibModalInstance, $log, serviceInfo, BigdataService) {
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
	    BigdataService.launchInstance(modal.serviceToLaunch.options.required, modal.serviceToLaunch.name, modal.serviceToLaunch.version).success(function (data){
        
       	}).error(function (data){

      	});
	}
});