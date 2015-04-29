'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.firewall:FirewallCtrl
 * @description 
 * # FirewallCtrl
 * Controller of the firewall view 
 * Allows to see current firewall configuration and to add new rules
 */
angular.module('hadoopApp.firewall', ['ui.router', 'hadoopApp.rule', 'hadoopApp.service.ips'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('firewall', {
    url:'/firewall',
    templateUrl: 'firewall/firewall.html',
    controller: 'FirewallCtrl',
    controllerAs: 'firewall'
  });
}])

.controller('FirewallCtrl', ['IpService', function(IpService) {
  this.testIps = [
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

    this.all = IpService.getAll();
    if(this.all.ips != null){
      this.allIps = [];
      for(var i=0 ; i < this.all.ips.length ; i++)
	this.allIps.push({ip:parseIPFrom(this.all.ips[i].IP),
	  mask:parseMaskFrom(this.all.ips[i].IP),
	  //state:this.all.ips.enabled // enabled is not implemented yet
	  state: 'enabled'
	});
      this.ips=this.allIps;
    }
    else{
      alert('Used test ips because communication with API failed\n');
      this.ips=this.testIps;
    }
    
  this.addRule = function(str) {
    // Adds the rule inside text input if it is valid
    if(isValidIP(document.getElementById("firewall_input_rule").value)){
      this.ips.push({
	ip: parseIPFrom(document.getElementById("firewall_input_rule").value),
	mask: parseMaskFrom(document.getElementById("firewall_input_rule").value),
	state: 'enabled'
      });
      // TODO
      alert('TODO\n'+
	'addRule function must Notify API about adding given rule @ firewall/firewall.js'
      );
    }
  };

}]);
 
