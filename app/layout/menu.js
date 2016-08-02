'use strict';

/**
 * @ngdoc directive
 * @name bigdata.menu:menu 
 * @description
 * # menu
 */
angular.module('bigdata.layout.menu', ['bigdata.layout.menu.topbar', 'bigdata.layout.menu.sidebar'])
	.directive('menu',function(){
		return {
        templateUrl:'layout/menu.html',
        restrict: 'E',
        replace: true,
    	}
	});


