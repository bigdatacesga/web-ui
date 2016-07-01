'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.menu.sidebar:sidebar
 * @description
 * # adminPosHeader
 */

angular.module('cesgaBDApp.menu.sidebar', [])
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'components/menu/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'dashboard';

        $scope.collapsePaaS = 0
        $scope.unfoldPaas = function(x){
          if(x==$scope.collapsePaaS)
            $scope.collapsePaaS = 0;
          else
            $scope.collapsePaaS = x;
        };

        $scope.collapseSettings = 0
        $scope.unfoldSettings = function(x){

          if(x==$scope.collapseSettings)
            $scope.collapseSettings = 0;
          else
            $scope.collapseSettings = x;
        };

      }
    }
  }]);
