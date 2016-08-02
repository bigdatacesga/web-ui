'use strict';

/**
 * @ngdoc directive
 * @name bigdata.menu.topbar:topbar
 * @description
 * # headerNotification
 */
angular.module('bigdata.layout.menu.topbar', [])
	.directive('topbar',function(){
		return {
			templateUrl:'layout/topbar.html',
			restrict: 'E',
			replace: true,
    	}
	})
	.controller('TopBarCtrl', ['$scope', '$state', '$window', function($scope, $state, $window) {
		$scope.username = $window.sessionStorage.username;
		$scope.logout = function () {
			$window.sessionStorage.clear();
			$state.go('login');
		};
	}]);


