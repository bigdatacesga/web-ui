'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.firewall:FirewallCtrl
 * @description 
 * # FirewallCtrl
 * Controller of the firewall view 
 * Allows to see current firewall configuration and to add new rules
 */
angular.module('hadoopApp.firewall', ['ui.router', 'hadoopApp.rule'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('firewall', {
    url:'/firewall',
    templateUrl: 'firewall/firewall.html',
    controller: 'FirewallCtrl',
    controllerAs: 'firewall'
  });
}])

.controller('FirewallCtrl', [function() {
  this.ips = [
      {
	ip:'192.168.1.135',
	mask:'32',
	state:'enabled'
	
      },
      {
	ip:'192.168.1.0',
	mask:'24',
	state:'disabled'
	
      },
      {
	ip:'0.0.0.0',
	mask:'32',
	state: 'enabled'
      },
      {
	ip: '192.168.1.1',
	mask: '',
	state: 'disabled'
      }
    ];

  this.addRule = function() {
    // Adds the rule inside text input if it is valid
    // TODO
    alert('TODO\n'+
      'addRule function @ firewall/firewall.js'
    );
  };

}]);
 
