'use strict';

/**
 * @ngdoc service
 * @name cesgaBDApp.KeyService
 * @description
 * # KeyService
 * SSH Keys Service in the cesgaBDApp.
 */
angular.module('cesgaBDApp.components.endpoints.keys', [])
    .factory('KeyService', ['$http', function ($http) {
        return {

            getAll: function() {
                return $http.get('/api/sshKeys');
            },

            get: function(id) {
                return $http.get('/api/sshKeys/'+id);
            },

            remove: function(id) {
                return $http.delete('/api/sshKeys/'+id);
            },

            create: function(key) {
                key.enabled = true;
                key.type = "droppedAttribute";
                return $http.post('/api/sshKeys', key);
            },

            update: function(key) {
                return $http.put('/api/sshKeys/' + key["id"], key);
            }
        };
    }]);
