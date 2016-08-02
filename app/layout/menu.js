'use strict';

/**
 * @ngdoc directive
 * @name bigdata.menu:menu 
 * @description
 * # menu
 */
angular.module('bigdata.menu', ['bigdata.menu.topbar', 'bigdata.menu.sidebar'])
	.directive('menu',function(){
		return {
        templateUrl:'components/menu/menu.html',
        restrict: 'E',
        replace: true,
    	}
	});


