'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.cluster.cluster-directive:cluster
 * @description
 * # stats
 */
angular.module('hadoopApp.cluster.cluster-directive', [])

.directive('cluster', [function() {
  return {
    templateUrl:'components/cluster/cluster.html',
    restrict: 'E',
    replace: true,
    scope: {
      clusterData: '=',
      showDetails: '@'
    },
    link: function(scope, element, attrs) {
      scope.toggleDetails = function() {
        if(scope.showDetails == 'false') {
          scope.showDetails = 'true';
        } else {
          scope.showDetails = 'false';
        }
      };
      scope.isCollapsed = function() {
        if(scope.showDetails == 'false') {
          return true;
        } else {
          return false;
        }
      };
    },
    /* 
    // Default options: 
    //   using compile is too messy (you can not use link)
    //   there is also the new =? option when defining attributes
    //   For the moment we avoid default options to simplify code
    //   
    compile: function(tElement, tAttrs){
      if (!tAttrs.showDetails) { tAttrs.showDetails = 'false'; }
      return {
                post: function (scope, element, attrs) {
                    scope.toggleDetails = function () {
                        scope.showDetails = !scope.showDetails;
                    };
                }
      };
    }
    */
  };

}]);
