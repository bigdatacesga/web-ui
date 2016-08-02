'use strict';

/**
 * @ngdoc service
 * @name bigdata.NodesServiceCloud
 * @description
 * Retrieve info about the nodes of a given cloud cluster
 */
angular
  .module('bigdata.services.nodes', [])
  .factory('NodesServiceCloud', ['$http', function ($http) {
    return {
      listClusterNodes: function(clusterId) {
        return $http.get('/api/nodes/cluster/' + clusterId);
      }
    };
  }]);
