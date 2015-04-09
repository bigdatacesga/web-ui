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
      showDetails: '='
    },
    /*
    link: function(scope, element, attrs) {
      scope.toggleDetails = function() {
        scope.showDetails = !scope.showDetails;
      };
    },
    */
    // Default options 
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
  };

}]);
