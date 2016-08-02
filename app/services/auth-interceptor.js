'use strict';

/**
 * @ngdoc service
 * @name bigdata.services.auth-interceptor
 * @description If user has not valid token it is redirected to login page
 * # AuthInterceptor
 * auth interceptor
 */
angular.module('bigdata.services.auth-interceptor', [])

.factory('authInterceptor', function ($rootScope, $q, $injector, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      var token = window.sessionStorage.token;
      var expires = parseInt(window.sessionStorage.expires);
      if (token && expires && expires > new Date().getTime()) {
        config.headers['x-auth-token'] = $window.sessionStorage.token;
        //config.headers.Authorization = 'x-auth-token ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        //alert("You need to authenticate");
        //$state.go('login');
        location = "#/login";
      }
      return response || $q.when(response);
    }
  };
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

