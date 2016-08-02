angular.module('cesgaBDApp.details.bigdata', ['ui.router','ui.bootstrap'])

    .controller('ModalInstanceDetailsCtrlBigdata', function ($scope, $uibModalInstance, $log, instanceInfo, BigdataService) {

        var modal = this;
        modal.instanceInfo = instanceInfo;
        
        BigdataService.showInstanceNodes(modal.instanceInfo.uri).success(function (data){
            modal.instanceInfo.nodes = data.nodes
        }).error(function (data){
          alert('Could not get the version');
        });

        modal.dismiss = function(reason) {
            $uibModalInstance.dismiss(reason);
        };

    });