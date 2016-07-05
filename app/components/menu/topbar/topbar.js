'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.menu.topbar:topbar
 * @description
 * # headerNotification
 */
angular.module('cesgaBDApp.menu.topbar', [])
	.directive('topbar',function(){
		return {
			templateUrl:'components/menu/topbar/topbar.html',
			restrict: 'E',
			replace: true,
    	}
	})
	.controller('TopBarCtrl', ['$scope', '$state', '$window', function($scope, $state, $window) {
		$scope.logout = function () {
			$window.sessionStorage.clear();
			$state.go('login');
		};
	}]);


