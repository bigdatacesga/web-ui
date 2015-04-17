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
    },

  };

}]);