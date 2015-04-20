'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.sshkey.sshkey-directive:sshkey
 * @description
 * # stats
 */
angular.module('hadoopApp.sshkey.sshkey-directive', []) 

.directive('sshkey', [function() {
  return {
    templateUrl:'components/sshkey/sshkey.html',
    restrict: 'E',
    scope: {
      sshkeyData: '=',
      expandedKey: '@'
    },
    link: function(scope, element, attrs) {
      scope.removeKey = function() {
	element.html('');
        // TODO
	alert('TODO\n'+
	  'removeKey function must Notify API about removing given key @ link function @ sshkey/sshkey-directive.js');
      };
      scope.expandShortenKey = function() {
	if(scope.expandedKey=='true'){
	  scope.expandedKey = 'false';
	}
	else{
	  scope.expandedKey = 'true';
	}
      };
      scope.isExpanded = function() {
	if(scope.expandedKey=='true')
	  return false;
	return true;
      };
      scope.isNotExpanded = function() {
	if(scope.expandedKey=='true')
	  return true;
	return false;
      };
    },

  };

}]);