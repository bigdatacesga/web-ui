'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.rule.rule-directive:rule
 * @description
 * # stats
 */
angular.module('hadoopApp.rule.rule-directive', []) 

.directive('rule', [function() {
  return {
    templateUrl:'components/rule/rule.html',
    restrict: 'E',
    scope: {
      ruleData: '='
    },
    link: function(scope, element, attrs) {
      scope.removeRule = function() {
        // TODO
	alert('TODO\n'+
	  'removeRule function @ link function @ rule/rule-directive.js');
      };
      scope.getStateButtonText= function() {
	if(scope.ruleData.state=='enabled')
	  return "Disable Rule";
	else
	  return "Enable Rule";
      };
      scope.getStateButtonClass= function() {
	if(scope.ruleData.state=='enabled')
	  return "btn btn-warning";
	else
	  return "btn btn-primary";
      };
      scope.toggleRule = function() {
	if(scope.ruleData.state=='enabled'){
	  scope.ruleData.state='disabled';
	  // TODO HERE: notify API about DISABLING rule
	  alert('TODO\n'+
	    'Notify APU about ENABLING rule @ toogleRule @ rule-directive.js');
	}
	else{
	  scope.ruleData.state='enabled';
	  // TODO HERE: notify API about ENABLING rule
	  alert('TODO\n'+
	    'Notify APU about DISABLING rule @ toogleRule @ rule-directive.js');
	}
      };
      scope.getRuleText = function() {
	return scope.ruleData.ip+
	  ((scope.ruleData.mask.length>0) ? ' / '+scope.ruleData.mask : '')+' '+
	  ((scope.ruleData.state=='enabled') ? '(ENABLED)' : '(DISABLED)');
      };
    },

  };

}]);