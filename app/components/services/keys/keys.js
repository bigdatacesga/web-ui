'use strict';

/**
 * @ngdoc service
 * @name hadoopApp.KeyService
 * @description
 * # KeyService
 * SSH Keys Service in the hadoopApp.
 */
angular.module('hadoopApp.service.keys', [])
.factory('KeyService', ['$http', function ($http) {
    return {
      getAll: function() {
        return $http.get('/hadoop/v1/keys');
      },
      get: function(id) {
        return $http.get('/hadoop/v1/keys/'+id);
      },
      delete: function(id) {
        return $http.delete('/hadoop/v1/keys/'+id);
      },
      create: function(pubkey) {
        var key = { 
          pubkey: pubkey,
          enabled: true 
        };
        return $http.post('/hadoop/v1/keys', key);
      },
      // To update a key use {id: 2, pubkey: "dss ...", enabled: false}
      update: function(key) {
        return $http.put('/hadoop/v1/keys', key);
      }
    };
  }]);
