'use strict';

/**
 * @ngdoc service
 * @name hadoopApp.ClusterService
 * @description
 * # ClusterService
 * Service in the hadoopApp.
 */
angular.module('hadoopApp.service.cluster', [])
.factory('ClusterService', ['$http', function ($http) {
    return {
      list: function() {
        return $http.get('/hadoop/v1/clusters');
      },
      show: function(clusterId) {
        return $http.get('/hadoop/v1/clusters/'+clusterId);
      },
      delete: function(clusterId) {
        return $http.delete('/hadoop/v1/clusters/'+clusterId);
      },
      create: function(size, replicas, blocksize, reducers) {
        var options = { 
          size: size,
          dfsReplicas: replicas,
          dfsBlockSize: blocksize,
          reduceTasksNumber: reducers, 
        };
        return $http.post('/hadoop/v1/clusters', options);
      }
    };
  }]);
