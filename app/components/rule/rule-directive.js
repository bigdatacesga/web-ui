'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.rule.rule-directive:rule
 * @description
 * # stats
 */
angular.module('hadoopApp.rule.rule-directive', ['hadoopApp.service.ips']) 

.directive('rule', ['IpService', function(IpService) {
  return {
    templateUrl:'components/rule/rule.html',
    restrict: 'E',
    scope: {
      ruleData: '='
    },
    link: function(scope, element, attrs) {
      var vmRule = scope;
      
      // --- REMOVE RULE //
      scope.removeRule = function() {
        this.onIpServiceRemoveSuccess = function(data){
	   element.html('');
	}
	
	this.onIpServiceRemoveError = function(data){
	  alert('The IP could not be removed due to a server-side error.\n'+
	    'Please notify administrator');
	}
	
	IpService.remove(scope.ruleData.ip).success(function (data){
	  vmRule.onIpServiceRemoveSuccess(data);
	}).error(function (data){
	  vmRule.onIpServiceRemoveError(data);
	});
      };
      // REMOVE RULE --- //
      
      
      // --- RULE UPDATE //
      scope.toggleRule = function() {
	this.toggleRuleCheckbox = function (){
	  if(scope.ruleData.state=='enabled')
	    scope.ruleData.state='disabled';
	  else
	    scope.ruleData.state='enabled';
	}
	
	this.undoCheckboxChange = function (){
	  scope.stateCheckbox = !scope.stateCheckbox;
	}
	
	this.onIpServiceUpdateSuccess = function(data){
	  this.toggleRuleCheckbox();
	}
	
	this.onIpServiceUpdateError = function(data){
	  alert('Rule state could not be updated due to a server-side error.\n'+
	    'Please notify administrador');
	  this.undoCheckboxChange();
	}
	
	this.ipServiceUpdateData = {
	  id: 2,
	  address: scope.ruleData.ip+'/'+scope.ruleData.mask,
	  enabled: (scope.ruleData.state=='enabled') ? false : true
	};
	IpService.update(this.ipServiceUpdateData).success(function (data){
	    vmRule.onIpServiceUpdateSuccess(data);
	}).error(function (data){
	    vmRule.onIpServiceUpdateError(data);
	});
	
      };
      // RULE UPDATE --- //
      
      
      scope.getStateCheckboxChecked= function() {
	if(scope.ruleData.state=='enabled')
	  return true;
	else
	  return false;
      };
      
      scope.getRuleText = function() {
	return scope.ruleData.ip+
	  ((scope.ruleData.mask.length>0) ? ' / '+scope.ruleData.mask : '');
      };
      
      scope.getRuleTextStyle = function() {
	if(scope.ruleData.state!='enabled')
	  return "color: #888; text-decoration: line-through";
	return "color: #000";
      };
    },

  };

}]);