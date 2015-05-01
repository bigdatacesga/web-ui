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
  var vmFirewall = this;// viewmodelFirewall;
  // --- Load Firewall data //
  this.ips = [];
  this.onIpServiceGetAllSuccess = function (data){
    for(var i=0 ; i < data.ips.length ; i++)
      this.ips.push({
	ip:parseIPFrom(data.ips[i]),
	mask:parseMaskFrom(data.ips[i]),
	state: 'enabled'
      });
    
    /* As API is not working yet the next code is used to load test data.
     * Once API is ready just remove it.
     */
    this.ips.push({
	ip:'192.168.1.135',
	mask:'32',
	state:'enabled'
    });
    this.ips.push({
	ip:'192.168.1.0',
	mask:'24',
	state:'disabled'
    });
    this.ips.push({
	ip:'0.0.0.0',
	mask:'32',
	state: 'enabled'
    });
    this.ips.push({
	ip: '192.168.1.1',
	mask: '',
	state: 'disabled'
    });
  }
  
    this.onIpServiceGetAllError = function(data){
    alert('Firewall data could not be loaded.\n'+
      'Please notify administrator.');
    
    /* As API is not working yet the next code is used to load test data.
     * Once API is ready just remove it.
     */
    this.ips.push({
	ip:'192.168.1.135',
	mask:'32',
	state:'enabled'
    });
    this.ips.push({
	ip:'192.168.1.0',
	mask:'24',
	state:'disabled'
    });
    this.ips.push({
	ip:'0.0.0.0',
	mask:'32',
	state: 'enabled'
    });
    this.ips.push({
	ip: '192.168.1.1',
	mask: '',
	state: 'disabled'
    });
  }
  
  
  IpService.getAll().success(function (data){
    vmFirewall.onIpServiceGetAllSuccess(data);
  }).error(function (data){
    vmFirewall.onIpServiceGetAllError(data);
  });
    
  // Firewall data Loaded --- //
  
  // --- Firewall Add Rule //
  this.addRule = function(str) {
    // Adds the rule inside text input if it is valid
    if(isValidIP(document.getElementById("firewall_input_rule").value)){ // TODO write isValidIP. assets/js/configuration_utils.js
      this.newIP = {
	ip: parseIPFrom(document.getElementById("firewall_input_rule").value),
	mask: parseMaskFrom(document.getElementById("firewall_input_rule").value),
	state: 'enabled'
      };
      
      this.onIpServiceCreateSuccess = function(data){
	this.ips.push(this.newIP);
	document.getElementById("firewall_input_rule").value="";
      }
      
      this.onIpServiceCreateError = function(data){
	alert('IP '+this.newIP.ip+'/'+this.newIP.mask+' could not be added to firewall due to a server-side error.\n'+
	  'Please notify administrator.');
      }
      
      IpService.create(this.newIP.ip+'/'+this.newIP.mask).success(function (data){
	vmFirewall.onIpServiceCreateSuccess(data);
      }).error(function (data){
	vmFirewall.onIpServiceCreateError(data);
      });
    
    }
    else
	alert("Given IP was not valid.\n");
    
  };
  // Firewall Rule Added --- //

}]);
 
