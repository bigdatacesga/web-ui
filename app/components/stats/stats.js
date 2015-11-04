'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.stats:stats
 * @description
 * # stats
 */
    angular.module('hadoopApp.stats', [])
        .directive('stats',function() {
            return {
                templateUrl:'components/stats/stats.html',
                restrict:'E',
                replace:true,
                scope: {
                    'model': '=',
                    'comments': '@',
                    'number': '@',
                    'name': '@',
                    'colour': '@',
                    'details':'@',
                    'type':'@',
                    'link' : '@'
                }
            }
    });
