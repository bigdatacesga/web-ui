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
      scope.removeRule = function() {
        this.onIpServiceRemoveSuccess = function(data,elementToRemove){
	    elementToRemove.html('');
	}
	
	this.onIpServiceRemoveError = function(data,elementToRemove){
	  alert('The IP could not be removed due to a server-side error.\n'+
	    'Please notify administrator');
	  elementToRemove.html('');
	}
	
	IpService.remove(scope.ruleData.ip,this.onIpServiceRemoveSuccess,this.onIpServiceRemoveError);
      };
      scope.getStateCheckboxChecked= function() {
	if(scope.ruleData.state=='enabled')
	  return true;
	else
	  return false;
      };
      
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
	
	this.onIpServiceUpdateSuccess = function(data,toggleRuleCheckbox){
	  toggleRuleCheckbox();
	}
	
	this.onIpServiceUpdateError = function(data,undoCheckboxChange){
	  alert('Rule state could not be updated due to a server-side error.\n'+
	    'Please notify administrador');
	  undoCheckboxChange();
	}
	
	this.ipServiceUpdateData = {
	  id: 2,
	  address: scope.ruleData.ip+'/'+scope.ruleData.mask,
	  enabled: (scope.ruleData.state=='enabled') ? false : true
	};
	IpService.update(this.ipServiceUpdateData, this.onIpServiceUpdateSuccess, this.onIpServiceUpdateError, this.toggleRuleCheckbox, this.undoCheckboxChange);
	
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