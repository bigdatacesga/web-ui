'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.notifications:notifications
 * @description
 * # notifications
 */
angular.module('cesgaBDApp.notifications', [])
	.directive('notifications',function(){
		return {
        templateUrl:'components/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


