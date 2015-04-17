'use strict';

/**
 * @ngdoc service
 * @name hadoopApp.ClusterService
 * @description
 * # ClusterService
 * Service in the hadoopApp.
 */
angular.module('hadoopApp.service.ips', [])
.factory('IpService', ['$http', function ($http) {
    return {
      getAll: function() {
        return $http.get('/hadoop/v1/ips');
      },
      get: function(id) {
        return $http.get('/hadoop/v1/ips/'+id);
      },
      delete: function(id) {
        return $http.delete('/hadoop/v1/ips/'+id);
      },
      create: function(address) {
        var ip = { 
          address: address,
          enabled: true 
        };
        return $http.post('/hadoop/v1/ips', ip);
      },
      // To update an IP use {id: 2, address: "193.144.34.10", enabled: false}
      update: function(ip) {
        return $http.put('/hadoop/v1/ips', ip);
      }
    };
  }]);
