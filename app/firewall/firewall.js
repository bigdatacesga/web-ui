'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.firewall:FirewallCtrl
 * @description 
 * # FirewallCtrl
 * Controller of the firewall view 
 * Allows to see current firewall configuration and to add new rules
 */
angular.module('cesgaBDApp.firewall', ['ui.router', 'cesgaBDApp.iprule', 'cesgaBDApp.components.endpoints.ips'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('firewall', {
    url:'/firewall',
    templateUrl: 'firewall/firewall.html',
    controller: 'FirewallCtrl',
    controllerAs: 'firewall',
    data: {
        requireLogin: true
    }
  });
}])

.controller('FirewallCtrl', ['IpService', '$log', function(IpService, $log) {

  var vm = this;

  vm.ips = [];
  vm.newip = { address: '', mask: '' };

  vm.addRule = function() {
    IpService.create(vm.newip)
    .then(function(success) {
        activate();
      })
      .catch(function(error) {
        vm.errorMessage = 'Unable to connect to the Big Data service';
        $log.info('Status: ' + error.status);
        $log.info('Error message: '+ error.data.message);
      });
  };

  activate();

  function activate() {
    return IpService.getAll()
      .then(function(data){
        vm.ips = data.data;
      })
      .catch(function(error) {
        vm.errorMessage = 'Unable to connect to the Big Data service';
        $log.warn(vm.errorMessage);
        $log.info('Status: ' + error.status);
        $log.info('Error message: '+ error.data.message);
      });
    //TODO: Errors should be handled globally in a $http interceptor
    //      eg. status=401 -> redirect to login page
  }

}]);
 
