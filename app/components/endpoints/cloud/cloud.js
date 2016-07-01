'use strict';

/**
 * @ngdoc service
 * @name cesgaBDApp.CloudService
 * @description
 * # CloudService
 * Service in the cesgaBDApp.
 */
angular.module('cesgaBDApp.components.endpoints.cloud', [])
.factory('CloudService', ['$http', function ($http) {
    var callTimeout = 10000; //10 seconds
    return {
      list: function() {
        return $http.get('/api/clusters', {timeout: callTimeout});
        //return $http.get('/cloud/api/clusters', {timeout: callTimeout});
      },
      show: function(clusterId) {
        return $http.get('/api/clusters/'+clusterId, {timeout: callTimeout});
      },
      remove: function(clusterId) {
        return $http.delete('/api/clusters/'+clusterId);
      },
      create: function(options) {
        return $http.post('/api/clusters', options, {timeout: callTimeout});
      }
    };
  }]);
