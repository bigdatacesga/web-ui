'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.menu.topbar:topbar
 * @description
 * # headerNotification
 */
angular.module('hadoopApp.menu.topbar', [])
	.directive('topbar',function(){
		return {
        templateUrl:'components/menu/topbar/topbar.html',
        restrict: 'E',
        replace: true,
    	}
	});


