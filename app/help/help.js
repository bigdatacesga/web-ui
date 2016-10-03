'use strict';
/**
 * @ngdoc function
 * @name bigdata.help:HelpCtrl
 * @description 
 * Allows to see help/documentation
 */
angular.module('bigdata.help', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('help', {
    url:'/help',
    templateUrl: 'help/help.html'
  });
}]);
