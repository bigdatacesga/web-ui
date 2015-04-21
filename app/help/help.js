'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.help:HelpCtrl
 * @description 
 * Allows to see help/documentation
 */
angular.module('hadoopApp.help', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('help', {
    url:'/help',
    templateUrl: 'help/help.html',
  });
}])
