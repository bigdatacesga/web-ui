'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.notifications:notifications
 * @description
 * # notifications
 */
angular.module('hadoopApp.notifications', [])
	.directive('notifications',function(){
		return {
        templateUrl:'components/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


