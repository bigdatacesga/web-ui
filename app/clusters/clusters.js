'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.clusters:ClustersCtrl
 * @description 
 * # ClustersCtrl
 * Controller of the clusters view 
 * Allows to see active clusters and to launch new clusters
 */
angular.module('hadoopApp.clusters', ['ui.router', 'hadoopApp.notifications'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('clusters', {
    url:'/clusters',
    templateUrl: 'clusters/clusters.html',
    controller: 'ClustersCtrl'
  });
}])

.controller('ClustersCtrl', [function() {
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
}]);
