'use strict';

/**
 * @ngdoc service
 * @name hadoopApp.auth.auth-interceptor
 * @description
 * # AuthInterceptor
 * auth interceptor
 */
angular.module('hadoopApp.services.auth.auth-interceptor', [])

.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        $state.go('login');
      }
      return response || $q.when(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

