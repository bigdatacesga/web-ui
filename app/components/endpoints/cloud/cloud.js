'use strict';

/**
 * @ngdoc service
 * @name cesgaBDApp.CloudService
 * @description
 * # CloudService
 * Service in the hadoopApp.
 */
angular.module('cesgaBDApp.components.endpoints.cloud', [])
.factory('CloudService', ['$http', function ($http) {
    return {
      list: function() {
        return $http.get('/cloud/api/clusters');
      },
      show: function(clusterId) {
        return $http.get('/cloud/api/clusters/'+clusterId);
      },
      remove: function(clusterId) {
        return $http.delete('/cloud/api/clusters/'+clusterId);
      },
      create: function(options) {
        return $http.post('/cloud/api/clusters', options);
      }
    };
  }]);
