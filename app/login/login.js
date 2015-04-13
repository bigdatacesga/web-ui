'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.clusters:ClustersCtrl
 * @description 
 * # ClustersCtrl
 * Controller of the clusters view 
 * Allows to see active clusters and to launch new clusters
 */
angular.module('hadoopApp.login', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('login', {
    url:'/login',
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  });
}])

.controller('LoginCtrl', ['$state', '$http', '$window', function($state, $http, $window) {
  var self = this;
  self.user = { username: 'test', password: 'testpass' };
  self.message = '';

  self.login = function () {
    $http
      .post('/authenticate', self.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        self.message = 'Welcome';
        $state.go('dashboard');
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;

        // Handle login errors here
        self.message = 'Error: Invalid user or password';
      });
  };

  self.launchClusterWizard = function() {
    // Open the modal to launch a new cluster
  };

}]);
