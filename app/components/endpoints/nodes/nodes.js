'use strict';

/**
 * @ngdoc service
 * @name cesgaBDApp.NodesService
 * @description
 * # NodesService
 * Service in the cesgaBDApp.
 */
angular.module('cesgaBDApp.components.endpoints.multinode.nodes', [])
.factory('NodesServiceMulti', ['$http', function ($http) {
    return {
      listClusterNodes: function(service_type, service_name, instance_id) {

        var base_url = '/bigdata/api/v1/services/nodes/'
        var url = base_url + '?type='+ service_type + '&name=' + service_name + '&id=' + instance_id
        return $http.get(url);
      }
    };
  }]);

angular.module('cesgaBDApp.components.endpoints.cloud.nodes', [])
.factory('NodesServiceCloud', ['$http', function ($http) {
    return {
      listClusterNodes: function(clusterId) {
        return $http.get('/cloud/api/nodes/cluster/' + clusterId);
      }
    };
  }]);