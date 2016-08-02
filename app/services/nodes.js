'use strict';

/**
 * @ngdoc service
 * @name bigdata.NodesService
 * @description
 * # NodesService
 * Service in the bigdata.
 */
angular.module('bigdata.components.endpoints.bigdata.nodes', [])
.factory('NodesServiceMulti', ['$http', function ($http) {
    return {
      listClusterNodes: function(service_type, service_name, instance_id) {

        var base_url = '/bigdata/api/v1/services/nodes/'
        var url = base_url + '?type='+ service_type + '&name=' + service_name + '&id=' + instance_id
        return $http.get(url);
      }
    };
  }]);

angular.module('bigdata.components.endpoints.cloud.nodes', [])
.factory('NodesServiceCloud', ['$http', function ($http) {
    return {
      listClusterNodes: function(clusterId) {
        return $http.get('/api/nodes/cluster/' + clusterId);
      }
    };
  }]);