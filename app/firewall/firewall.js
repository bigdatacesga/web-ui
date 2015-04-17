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
  this.rules = [
      {rule:'-A INPUT -s 192.168.1.135/32 -p tcp -j ACCEPT'},
      {rule:'-A INPUT -s 192.168.1.0/24 -p tcp -m tcp --dport 22 -j ACCEPT'},
      {rule:'-A INPUT -s 0.0.0.0/32 -p tcp -m tcp --dport 80 -j ACCEPT'},
      {rule:'-A INPUT -s 0.0.0.0/32 -p tcp -m tcp --sport 80 -j ACCEPT'},
      {rule:'-A INPUT -s 0.0.0.0/32 -p tcp -m tcp --sport 8080 -j ACCEPT'},
      {rule:'-A INPUT -s 0.0.0.0/32 -p tcp -m tcp --sport 8000 -j ACCEPT'}
    ];

  this.addRule = function() {
    // Adds the rule inside text input
    // TODO
    alert('TODO\n'+
      'addRule function @ firewall/firewall.js'
    );
  };

}]);
 
