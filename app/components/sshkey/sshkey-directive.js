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
      sshkeyData: '='
    },
    link: function(scope, element, attrs) {
      scope.removeKey = function() {
        // TODO
	alert('TODO\n'+
	  'removeKey function @ link function @ sshkey/sshkey-directive.js');
      };
    },

  };

}]);