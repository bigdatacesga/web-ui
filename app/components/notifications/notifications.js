'use strict';

/**
 * @ngdoc directive
 * @name bigdata.notifications:notifications
 * @description
 * # notifications
 */
angular.module('bigdata.notifications', [])
	.directive('notifications',function(){
		return {
        templateUrl:'components/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


