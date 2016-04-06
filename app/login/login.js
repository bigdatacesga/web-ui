'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.clusters:ClustersCtrl
 * @description 
 * # ClustersCtrl
 * Controller of the clusters view 
 * Allows to see active clusters and to launch new clusters
 */
angular.module('cesgaBDApp.login', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('login', {
    url:'/login',
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  });
}])

.controller('LoginCtrl', ['$state', '$http', '$window', '$log', function($state, $http, $window, $log) {
  var self = this;
  self.user = { username: '', password: '' };
  self.message = '';

  self.login = function () {
    var credentials = "username=" + self.user.username 
             + "&password=" + self.user.password;
    $http
      .post('/cloud/api/authenticate', credentials, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      })
      .success(function (data, status, headers, config) {
        $log.debug('Successfully authentication of the user ' + self.user.username);
        $window.sessionStorage.token = data.token;
        $window.sessionStorage.expires = data.expires;
        self.message = 'Welcome';
        $state.go('dashboard');
      })
      .error(function (data, status, headers, config) {
        $log.debug('Failure authenticating user ' + self.user.username);
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;

        // Handle login errors here
        self.message = 'Error: Invalid user or password';
      });
  };

}]);
