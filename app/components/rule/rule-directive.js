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
        element.html('');
	// TODO
	alert('TODO\n'+
	  'removeRule function must Notify API about removing given rule @ link function @ rule/rule-directive.js');
      };
      scope.getStateCheckboxChecked= function() {
	if(scope.ruleData.state=='enabled')
	  return true;
	else
	  return false;
      };
      scope.toggleRule = function() {
	if(scope.ruleData.state=='enabled'){
	  scope.ruleData.state='disabled';
	  // TODO HERE: notify API about DISABLING rule
	  alert('TODO\n'+
	    'Notify API about ENABLING rule @ toogleRule @ rule-directive.js');
	}
	else{
	  scope.ruleData.state='enabled';
	  // TODO HERE: notify API about ENABLING rule
	  alert('TODO\n'+
	    'Notify API about DISABLING rule @ toogleRule @ rule-directive.js');
	}
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