'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.wizard_cluster.wizard_cluster-directive:wizard_cluster
 * @description
 * # wizard_cluster
 */
angular.module('hadoopApp.wizard_cluster.wizard_cluster-directive', [])

.directive('wizardcluster', function($timeout){ 
   return {
     templateUrl:'components/wizard_cluster/wizard_cluster.html',
     restrict: 'E',
     controller: 'WizardClusterCtrl',
     controllerAs: 'wizardCluster'
   }
})
.controller('WizardClusterCtrl', [function() {
  this.wStates = {
      INITIAL: 0,
      ADVANCED: 1,
      SUMMARY: 2
  };
  this.slaveNodesNum = 0;
  this.hdfsReplicas = 0;
  this.hdfsBlockSize = 0;
  this.reduceTasksNum = 0;
  
  this.wState = this.wStates.INITIAL;
  
  // BODY TITLE
  this.getBodyTitle = function (){
    if(this.wState==this.wStates.INITIAL){ // On INITIAL state
      return "BASIC CLUSTER CONFIGURATION";
    }
    else if(this.wState==this.wStates.ADVANCED){ // on ADVANCED state
      return "ADVANCED CLUSTER CONFIGURATION";
    }
    else if(this.wState==this.wStates.SUMMARY){ // on SUMMARY state
      return "CLUSTER CONFIGURATION SUMMARY";
    }
    else // Shouldnt reach this else
      return "UnexpectedwState ocurred.<br/>\n"+
	"Please <b>contact administrator</b>";
  }
  
  // BODY CONTENT FUNCTIONS
  this.isCollapsed = function(state){
      if(state==this.wState)
	return "collapse in";
      return "collapse";
  }
  
  // FOOTER (Buttons) FUNCTIONS
  this.getBackButtonType = function (){ // Define backButton class bassed on wizard state
    return "btn-default";
  }
  
  this.getNextButtonType = function (){ // Define nextButton class bassed on wizard state
    if(this.wState==this.wStates.SUMMARY)
      return "btn-success";
    return "btn-primary";
  }

  this.getBackButtonText = function (){ // Define backButton text based on wizard state
    switch(this.wState){
      case this.wStates.INITIAL:
	return "Advanced";
      case this.wStates.ADVANCED:
	return "Back";
      case this.wStates.SUMMARY:
	return "Back";
    }
  }
  
  this.getNextButtonText = function (){ // Define nextButton text based on wizard state
    switch(this.wState){
      case this.wStates.INITIAL:
	return "Review";
      case this.wStates.ADVANCED:
	return "Review";
      case this.wStates.SUMMARY:
	return "Launch";
    }
  }
  
  this.backButton = function (){ // on backButton ng-click
      switch(this.wState){
	case this.wStates.INITIAL:
	  this.wState = this.wStates.ADVANCED;
	  break;
	case this.wStates.ADVANCED:
	  this.wState = this.wStates.INITIAL;
	  break;
	case this.wStates.SUMMARY:
	  this.wState = this.wStates.ADVANCED;
	  break;
      }
  }
  
  this.nextButton = function (){ // on nextButton ng-click
    switch(this.wState){
      case this.wStates.INITIAL:
	this.wState = this.wStates.SUMMARY;
	break;
      case this.wStates.ADVANCED:
	this.wState = this.wStates.SUMMARY;
	break;
      case this.wStates.SUMMARY:
	this.launchCluster();
	break;
    }
  }
  
  this.launchCluster = function (){ 
    if(this.wState==this.wStates.SUMMARY){
      alert('TODO wizard_cluster-directive.js @ WizardClustrCtrl @ launchButton function :\n'+
	'Must communicate to API about launching cluster with specified configuration\n\n'+
	'this.slaveNodesNum = '+this.slaveNodesNum+'\n'+
	'this.hdfsReplicas = '+this.hdfsReplicas+'\n'+
	'this.hdfsBlockSize = '+this.hdfsBlockSize+'\n'+
	'this.reduceTasksNum = '+this.reduceTasksNum);
    }
    else // NEVER should reach this else. If this alert appears means something is wrong about the code
      alert('You only can launch a Cluster from the review.');
  }
}]);

