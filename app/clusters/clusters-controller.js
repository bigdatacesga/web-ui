/**
 * @ngdoc function
 * @name bigdata.clusters:ClustersCtrl
 * @description 
 * # ClustersCtrl
 * Controller of the clusters view 
 * Allows to see active/inactive clusters
 */
(function() {

  'use strict';

  var app = angular.module('bigdata.clusters', ['bigdata.services.logger', 'bigdata.clusters.info', 'bigdata.services.paas', 'ui.router', 'ui.bootstrap', 'ngMaterial']);

  app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('clusters', {
      url:'/clusters',
      templateUrl: 'clusters/clusters.html',
      controller: 'ClustersCtrl',
      controllerAs: 'vm',
      data: {
          requireLogin: true
      }
    });
  }]);

  app.controller('ClustersCtrl', ['PaasService', 'logger', '$uibModal', '$q', function(PaasService, logger, $uibModal, $q) {

    var vm = this;
    vm.clustersActive = [];
    vm.clustersInactive = [];

    vm.loading = true;

    // By default we show cluster history
    vm.historyEnabled = true;

    vm.toggleHistory = function() {
      vm.historyEnabled = !vm.historyEnabled;
    };

    vm.toggleClusterInfo = function(cluster) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'clusters/partials/details.html',
        controller: 'ClusterInfoCtrl',
        controllerAs: 'modal',
        size: 'lg',
        resolve: { instanceInfo: cluster }
      });
    };

    vm.destroyInstance = function(index) {
      PaasService.destroyInstance(vm.clustersActive[index].uri)
        .then(function (data) {
          // TODO: Display a status message instead of an alert
          alert('Instance destroyed');
          vm.clustersActive[index].status = "destroyed";
          // TODO: Reload asynchronously without refreshing the whole page
          location.reload();
        })
        .catch(function (data){
          alert('Could not destroy instance');
        });
    };

    vm.update = activate;

    activate();

    function activate() {
      vm.loading = true;
      var receivedData;
      var username = window.sessionStorage.username;
      // TODO: Split listInstances in several methods
      return PaasService.listInstances(username, null, null)
        .then(getClustersComplete)
        .catch(getClustersFailed);
    }

    function getClustersComplete(data){
      var clusters = data.data.clusters;
      var active = [];
      var inactive = [];
      for (var i = 0; i < clusters.length; i++) {
        var clusterData = clusters[i];
        var cluster = parseCluster(clusterData);
        if (isActive(cluster))
          addCluster(active, cluster);
        else
          addCluster(inactive, cluster);
      }
      vm.clustersActive = active.sort(reverseSortByProductAndId);
      vm.clustersInactive = inactive.sort(reverseSortByProductAndId);
      vm.loading = false;
    }

    function sortByProductAndId(c1, c2) {
      if (c1.product !== c2.product)
        return c1.product.localeCompare(c2.product);
      if (c1.version !== c2.version)
        return c1.version.localeCompare(c2.version);
      var id1 = parseInt(c1.id, 0);
      var id2 = parseInt(c2.id, 0);
      if (id1 === id2)
        return 0;
      return (id1 < id2) ? -1 : 1;
    }

    function reverseSortByProductAndId(c1, c2) {
      return -1 * sortByProductAndId(c1, c2);
    }

    function isActive(cluster) {
      if (/destroyed/.test(cluster.status))
        return false;
      return true;
    }

    function parseCluster(data) {
      var cluster = {
        uri: data.uri,
        name: "",
        status: ""
      };
      if (data.result == "success") {
        cluster.name = data.data.name
        cluster.status = data.data.status
      }
      return cluster;
    }

    function addCluster(clusters, cluster) {
      clusters.push({
        "uri": cluster.uri,
        "name": cluster.name,
        "status": cluster.status,
        "product": getProductName(cluster.uri),
        "version": getProductVersion(cluster.uri),
        "id": getClusterId(cluster.uri)
      })
    }

    function getProductName(clusterUri) {
      return clusterUri.split("/")[2];
    }

    function getProductVersion(clusterUri) {
      return clusterUri.split("/")[3];
    }

    function getClusterId(clusterUri) {
      return clusterUri.split("/")[4];
    }

    function getClustersFailed(error) {
      logger.error('Failed to retrieve the list of clusters from the PaaS service');
      logger.debug(error.status);
      logger.debug(error.data.message);
      return $q.reject(error);
    }

  }]);
})();
