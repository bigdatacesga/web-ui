'use strict';

/**
 * @ngdoc service
 * @name hadoopApp.ClusterService
 * @description
 * # ClusterService
 * Service in the hadoopApp.
 */
angular.module('hadoopApp.service.clusters', [])
.factory('ClusterService', ['$http', function ($http) {
    return {
      list: function() {
        return $http.get('/api/clusters');
      },
      show: function(clusterId) {
        return $http.get('/api/clusters/'+clusterId);
      },
      delete: function(clusterId) {
        return $http.delete('/api/clusters/'+clusterId);
      },
      create: function(size, replicas, blocksize, reducers) {
        var options = { 
          size: size,
          dfsReplicas: replicas,
          dfsBlockSize: blocksize,
          reduceTasksNumber: reducers, 
        };
        return $http.post('/api/clusters', options);
      }
    };
  }]);
