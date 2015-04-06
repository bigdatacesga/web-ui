'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.menu:menu 
 * @description
 * # menu
 */
angular.module('hadoopApp.menu', ['hadoopApp.menu.topbar', 'hadoopApp.menu.sidebar'])
	.directive('menu',function(){
		return {
        templateUrl:'components/menu/menu.html',
        restrict: 'E',
        replace: true,
    	}
	});


