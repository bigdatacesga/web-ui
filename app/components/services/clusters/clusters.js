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
      remove: function(clusterId) {
        return $http.delete('/api/clusters/'+clusterId);
      },
      create: function(size, replicas, blocksize, clustername) {
        var options = { 
          size: size,
          dfsReplicas: replicas,
          dfsBlocksize: blocksize,
          clustername: clustername
        };
        return $http.post('/api/clusters', options);
      }
    };
  }]);
