/**
 * @ngdoc function
 * @name bigdata.clusters.info:ClusterInfoCtrl
 * @description 
 * # ClusterInfoCtrl
 * Controller of the cluster Info modal
 * Allows to see details about a given cluster
 */
(function() {

  'use strict';

  angular.module('bigdata.clusters.info', ['bigdata.services.logger', 'ui.router', 'ui.bootstrap'])
    .controller('ClusterInfoCtrl', ['$uibModalInstance', 'logger', 'instanceInfo', 'PaasService', ClusterInfoCtrl]);
              
  function ClusterInfoCtrl($uibModalInstance, logger, instanceInfo, PaasService) {
    var modal = this;
    modal.instanceInfo = instanceInfo;

    PaasService.showInstanceNodes(modal.instanceInfo.uri)
      .then(function (response){
        modal.instanceInfo.nodes = response.data.nodes;
      })
      .catch(function (error){
        logger.error('Error retrieving cluster information');
        logger.debug(error);
        logger.debug(error.data.message);
        // TODO: Show in the alert messages component
        alert('Error retrieving cluster information');
      });

    modal.dismiss = function(reason) {
      $uibModalInstance.dismiss(reason);
    };
  }

})();
