'use strict';
/**
 * @ngdoc function
 * @name bigdata.dashboard:DashboardCtrl
 * @description 
 * # HomeCtrl
 * Controller of the home view of the dashboard
 * The home view is also the first view seen by a user
 */
angular.module('bigdata.dashboard', ['ui.router', 'bigdata.components.stat', 'bigdata.services.paas', 'bigdata.services.cloud', 'bigdata.services.ips','bigdata.services.keys'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('dashboard', {
    url:'/dashboard',
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl',
    controllerAs : 'dashboard',
    data: {
        requireLogin: true
    }
  });
}])

.controller('DashboardCtrl', ['PaasService', 'CloudService', 'IpService', 'KeyService', '$window', '$log', function(PaasService, CloudService, IpService, KeyService, $window, $log) {
  var vm = this;
  var errorNumber = 'Loading...';
  vm.stats = {
    hdp : {
      link: '#/hdp',
      comments: 'Hadoop Services',
      colour: 'yellow',
      type: 'database'
    },
    cloud : {
      link: '#/cloud',
      comments: 'Cloud Service',
      colour: 'primary',
      type: 'cloud',
      number: errorNumber
    },
    ips: {
      link: '#/firewall',
      comments: 'Allowed IPs',
      colour: 'green',
      type: 'arrows-h',
      number: errorNumber
    },
    keys: {
      link: '#/sshkeys',
      comments: 'SSH Keys',
      colour: 'green',
      type: 'key',
      number: errorNumber
    },
    clusters : {
        link:'#/clusters',
        comments:'PaaS Clusters',
        colour:'red',
        type:'cubes',
        number:errorNumber
    },
    products : {
        link:'#/products',
        comments:'PaaS products',
        colour:'red',
        type:'th-list',
        number:errorNumber
    }
  };

  function getCloudClustersInfo() {
    return CloudService.list()
      .then(function(data){
        vm.cloud = data.data;
        vm.stats.cloud.number = vm.cloud.length;
      })
      .catch(function(error) {
        $log.error('Error retrieving Cloud Clusters information: ' + error.statusText);
        vm.stats.cloud.number = 'N/A';
      });
  }

  function getFirewallIpsInfo() {
    return IpService.getAll()
      .then(function(data){
        vm.ips = data.data;
        vm.stats.ips.number = vm.ips.length;
      })
      .catch(function(error) {
        $log.error('Error retrieving user firewall addresses: ' + error.statusText);
        vm.stats.ips.number = errorNumber;
      });
  }

  function getSshKeysInfo() {
    return KeyService.getAll()
      .then(function(data){
        vm.keys = data.data;
        vm.stats.keys.number = vm.keys.length;
      })
      .catch(function(error) {
        $log.error('Error retrieving user SSH public keys: ' + error.statusText);
        vm.stats.keys.number = 'N/A';
      });
  }

  function getPaasClustersInfo() {
    var username = window.sessionStorage.username;
    return PaasService.listInstances(username, null, null)
      .then(function(data){
        var receivedData = data.data;
        vm.clusters = receivedData.clusters;
        vm.stats.clusters.number = vm.clusters.length;
      })
      .catch(function(error) {
        $log.error('Error retrieving Clusters info from Paas: ' + error.statusText);
        vm.stats.clusters.number = 'N/A';
      });
  }

  function getPaasProductsInfo() {
    return PaasService.listServices()
      .then(function(data){
        var receivedData = data.data;
        vm.products = receivedData.products;
        vm.stats.products.number = vm.products.length;
      })
      .catch(function(error) {
        $log.error('Error retrieving Products info from Paas: ' + error.statusText);
        vm.stats.products.number = 'N/A';
      });
  }

  function activate() {
    getCloudClustersInfo();
    getFirewallIpsInfo();
    getSshKeysInfo();
    getPaasClustersInfo();
    getPaasProductsInfo();
  }

  activate();
}]);
