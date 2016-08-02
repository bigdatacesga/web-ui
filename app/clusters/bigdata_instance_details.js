angular.module('bigdata.details.bigdata', ['ui.router','ui.bootstrap'])

    .controller('ModalInstanceDetailsCtrlBigdata', function ($scope, $uibModalInstance, $log, instanceInfo, PaasService) {

        var modal = this;
        modal.instanceInfo = instanceInfo;
        
        PaasService.showInstanceNodes(modal.instanceInfo.uri).success(function (data){
            modal.instanceInfo.nodes = data.nodes
        }).error(function (data){
          alert('Could not get the version');
        });

        modal.dismiss = function(reason) {
            $uibModalInstance.dismiss(reason);
        };

    });