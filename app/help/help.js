'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.help:HelpCtrl
 * @description 
 * # HelpCtrl
 * Controller of the help view 
 * Allows to see help/documentation
 */
angular.module('hadoopApp.help', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('help', {
    url:'/help',
    templateUrl: 'help/help.html',
    controller: 'HelpCtrl',
    controllerAs: 'help'
  });
}])

.controller('HelpCtrl', [function() {
  // TODO
  this.active = "help";
  this.helpText = helpTextHelp();
  
  this.isActive = function(str){
    if(this.active==str)
      return "active";
    return "inactive";
  };
  
  this.setActive = function(str){
    this.active = str;
    this.setHelpText();
  };
  
  this.setHelpText = function(){
    // helpText are defined in assets/js/help_texts.js
    switch(this.active){
      case "help":
	this.helpText = helpTextHelp();
	break;
      case "clusters":
	this.helpText = helpTextClusters();
	break;
      case "sshkeys":
	this.helpText = helpTextSSHKeys();
	break;
      case "firewall":
	this.helpText = helpTextFirewall();
	break;
    }
    
  }
}]);
  
