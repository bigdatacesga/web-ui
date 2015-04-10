'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.launcher:LauncherCtrl
 * @description 
 * # LauncherCtrl
 * Controller of the launcher view 
 * Allows to launch new clusters with specified parameters
 */
angular.module('hadoopApp.launcher', ['ui.router', 'hadoopApp.wizard_cluster'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('launcher', {
    url:'/launcher',
    templateUrl: 'launcher/launcher.html',
    controller: 'LauncherCtrl',
    controllerAs: 'launcher'
  });
}])

.controller('LauncherCtrl', [function() {
  // TODO
}]);
