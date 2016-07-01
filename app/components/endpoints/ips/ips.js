'use strict';

/**
 * @ngdoc service
 * @name cesgaBDApp.ClusterService
 * @description
 * # ClusterService
 * Service in the cesgaBDApp.
 */
angular.module('cesgaBDApp.components.endpoints.ips', [])
    .factory('IpService', ['$http', function ($http) {
        return {
            getAll: function () {
                return $http.get('/api/ips');
            },
            
            get: function (id) {
                return $http.get('/api/ips/' + id);
            },
            
            remove: function (id) {
                return $http.delete('/api/ips/' + id);
            },
            
            create: function (ip) {
                ip.enabled = true;
                return $http.post('/api/ips', ip);
            },

            // To update an IP use e.g. {id: 2, address: "193.144.34.10", mask: "24", enabled: false}
            update: function (ip) {
                var dir = "/api/ips/" + ip["id"];
                return $http.put(dir, ip);
            }
        };
    }]);
