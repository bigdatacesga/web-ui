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
	});


