'use strict';

/**
 * @ngdoc service
 * @name hadoopApp.NodesService
 * @description
 * # NodesService
 * Service in the hadoopApp.
 */
angular.module('hadoopApp.service.nodes', [])
.factory('NodesService', ['$http', function ($http) {
    return {
      listClusterNodes: function(clusterId) {
        return $http.get('/api/nodes/cluster/' + clusterId);
      }
    };
  }]);
