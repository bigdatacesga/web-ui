'use strict';

/**
 * @ngdoc service
 * @name bigdata.services.auth-interceptor
 * @description 
 * If user has not valid token it is redirected to login page
 */
angular.module('bigdata.services.auth-interceptor', [])

//.factory('authInterceptor', ['$q', '$state', '$window', '$log', function ($q, $state, $window, $log) {
.factory('authInterceptor', ['$q', '$window', '$log', '$rootScope', function ($q, $window, $log, $rootScope) {

  function addTokenToRequestHeaders(config) {
    config.headers = config.headers || {};
    var token = window.sessionStorage.token;
    var expires = parseInt(window.sessionStorage.expires);
    if (token && expires && expires > new Date().getTime()) {
      config.headers['x-auth-token'] = $window.sessionStorage.token;
    }
    return config;
  }

  function whenAuthErrorEmitUnauthorizedEvent(rejection) {
    if (rejection.status === 401) {
      $log.warn('Authentication required');
      $rootScope.$emit('unauthorized');
    }
    return $q.reject(rejection);
  }
  return {
    request: addTokenToRequestHeaders,
    requestError: function(rejection) {
      $log.error('Request error detected in auth interceptor: ' + rejection.statusText);
      return $q.reject(rejection);
    },
    response: function(response) {
      return response || $q.when(response);
    },
    responseError: whenAuthErrorEmitUnauthorizedEvent
  };
}])
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

