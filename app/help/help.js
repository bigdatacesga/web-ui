'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.help:HelpCtrl
 * @description 
 * Allows to see help/documentation
 */
angular.module('cesgaBDApp.help', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('help', {
    url:'/help',
    templateUrl: 'help/help.html',
  });
}])
