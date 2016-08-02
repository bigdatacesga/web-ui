'use strict';
/**
 * @ngdoc function
 * @name bigdata.dashboard:DashboardCtrl
 * @description 
 * # HomeCtrl
 * Controller of the home view of the dashboard
 * The home view is also the first view seen by a user
 */
angular.module('bigdata.dashboard', ['ui.router', 'bigdata.stat', 'bigdata.components.endpoints.bigdata', 'bigdata.components.endpoints.cloud', 'bigdata.components.endpoints.ips','bigdata.components.endpoints.keys'])

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

.controller('DashboardCtrl', ['BigdataService', 'CloudService', 'IpService', 'KeyService', '$window', function(BigdataService, CloudService, IpService, KeyService, $window) {
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];


  var errorNumber = "#unknown"
  vm.stats = {
    hdp : {
      link:"#/hdp",
      comments:"Hadoop Services",
      colour:"yellow",
      type:"database"
    },
    cloud : {
      link:"#/cloud",
      comments:"Cloud Service",
      colour:"primary",
      type:"cloud",
      number:errorNumber
    },
    ips: {
      link:"#/firewall",
      comments:"Allowed IPs",
      colour:"green",
      type:"arrows-h",
      number: errorNumber
    },
    keys: {
      link:"#/sshkeys",
      comments:"SSH Keys",
      colour:"green",
      type:"key",
      number: errorNumber
    },
    clusters : {
        link:"#/clusters",
        comments:"PaaS Clusters",
        colour:"red",
        type:"cubes",
        number:errorNumber
    },
    products : {
        link:"#/products",
        comments:"PaaS products",
        colour:"red",
        type:"th-list",
        number:errorNumber
    }
  };


  var receivedData;

  // getBigdata();
  // function getBigdata() {
  //   var username = window.sessionStorage.username;
  //   return BigdataService.listInstances(username,null,null)
  //     .then(function(data){
  //       receivedData = data.data;
  //       if(receivedData == undefined){
  //
  //       }else{
  //         vm.bigdata = receivedData.clusters;
  //         vm.stats.bigdata.number = vm.bigdata.length;
  //       }
  //     })
  //     .catch(function(error) {
  //       vm.stats.bigdata.number = errorNumber;
  //     });
  // }

  getCloud();
  var errorMessage;
  function getCloud() {
    return CloudService.list()
      .then(function(data){
        receivedData = data.data;
        if(receivedData == undefined){
            errorMessage = "Sorry :( , it seems we could not get info from the server, it may be down.";
            alert(errorMessage);
        }else{
          vm.cloud = data.data;
          vm.stats.cloud.number = vm.cloud.length;
        }
      })
      .catch(function(error) {
        vm.stats.cloud.number = errorNumber;
      });
  }


  getIps();
  function getIps() {
    return IpService.getAll()
        .then(function(data){
          vm.ips = data.data;
          vm.stats.ips.number = vm.ips.length;
        })
        .catch(function(error) {
          vm.stats.ips.number = errorNumber;
        });
  }


  getKeys();
  function getKeys() {
    return KeyService.getAll()
        .then(function(data){
          vm.keys = data.data;
          vm.stats.keys.number = vm.keys.length;
        })
        .catch(function(error) {
          vm.stats.keys.number = errorNumber;
        });
  }

    getBigdataInstances();
    function getBigdataInstances() {
        var username = window.sessionStorage.username;
        return BigdataService.listInstances(username,null,null)
            .then(function(data){
                receivedData = data.data;
                if(receivedData == undefined){

                }else{
                    vm.clusters = receivedData.clusters;
                    vm.stats.clusters.number = vm.clusters.length;
                }
            })
            .catch(function(error) {
                vm.stats.clusters.number = errorNumber;
            });
    }

    getBigdataServices();
    var errorMessage;
    function getBigdataServices() {
        return BigdataService.listServices()
            .then(function(data){
                receivedData = data.data;
                if(receivedData == undefined){
                    errorMessage = "Sorry :( , it seems we could not get info from the server, it may be down.";
                    alert(errorMessage);
                }else{
                    vm.products = receivedData.products;
                    vm.stats.products.number = vm.products.length;
                }
            })
            .catch(function(error) {
                vm.stats.products.number = errorNumber;
            });
    }



}]);
