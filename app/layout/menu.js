'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.menu:menu 
 * @description
 * # menu
 */
angular.module('cesgaBDApp.menu', ['cesgaBDApp.menu.topbar', 'cesgaBDApp.menu.sidebar'])
	.directive('menu',function(){
		return {
        templateUrl:'components/menu/menu.html',
        restrict: 'E',
        replace: true,
    	}
	});


