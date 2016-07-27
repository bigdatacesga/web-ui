'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.bigdata_instances:BigdataInstancesCtrl
 * @description 
 * # BigdataInstancesCtrl
 * Controller of the clusters view 
 * Allows to see active/inactive clusters
 */
(function() {
  var app = angular.module('cesgaBDApp.bigdata_instances', ['ui.router','ui.bootstrap', 'cesgaBDApp.notifications', 'cesgaBDApp.paasservice', 'cesgaBDApp.components.endpoints.bigdata']);

  app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('bigdata_instances', {
      url:'/bigdata_instances',
      templateUrl: 'bigdata_instances/bigdata_instances.html',
      controller: 'BigdataInstancesCtrl',
      controllerAs: 'instances',
      data: {
          requireLogin: true
      }
    });
  }])

  app.controller('BigdataInstancesCtrl', ['BigdataService', '$log', '$uibModal', '$q', function(BigdataService, $log, $uibModal) {

    var vm = this;
    var BackendDownMessage = "Unable to connect to the Big Data PaaS service";
    vm.clustersActive = [];
    vm.clustersInactive = [];

    vm.drawInstances = function() {
      var receivedData;
      var username = window.sessionStorage.username;
      // TODO: Split listInstances in several methods
      return BigdataService.listInstances(username, null, null)
        .then(getClustersComplete)
        .catch(getClustersFailed);
    }

    vm.toggleDetails = function(index, table) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'bigdata_instances/partials/details.html',
        controller: 'ModalInstanceDetailsCtrlBigdata',
        controllerAs: 'modal',
        size: 'lg',
        resolve: {
          instanceInfo: function () {
            if (table == "active"){
              return vm.clustersActive[index];
            }
            if (table == "inactive"){
              return vm.clustersInactive[index];
            }
          }
        }
      });
    };

    vm.destroyInstance = function(index) {
      BigdataService.destroyInstance(vm.clustersActive[index].uri)
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

    var historyEnabled = false;

    vm.toggleHistory = function() {
      historyEnabled = !historyEnabled;
    }

    vm.showHistory = function() {
      return historyEnabled;
    }

    //Call function to draw the data on the interface
    vm.drawInstances();

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
    }

    function sortByProductAndId(c1, c2) {
      if (c1.product.localeCompare(c2.product) != 0)
        return c1.product.localeCompare(c2.product)
      if (c1.version.localeCompare(c2.version) != 0)
        return c1.version.localeCompare(c2.version)
      var id1 = parseInt(c1.id, 0);
      var id2 = parseInt(c2.id, 0);
      if (id1 == id2)
        return 0;
      return (id1 < id2) ? -1 : 1;
    }

    function reverseSortByProductAndId(c1, c2) {
      return -1 * sortByProductAndId(c1, c2);
    }

    function isActive(cluster) {
      if (/(error|destroyed)/.test(cluster.status))
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
      handleBackendDown(BackendDownMessage, error.status, error.data.message);
      return $q.reject(error);
    }

    function handleBackendDown(message, status, error){
      if(message != undefined) alert(message);
      if(message != undefined) $log.info('Message: ' + message);
      if(status != undefined) $log.info('Status: ' + status);
      if(error != undefined) $log.info('Error: ' + error);
    }

  }]);
})();
