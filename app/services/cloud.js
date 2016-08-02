'use strict';

/**
 * @ngdoc service
 * @name bigdata.CloudService
 * @description
 * # CloudService
 * Service in the bigdata.
 */
angular.module('bigdata.services.cloud', [])
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
