'use strict';

/**
 * @ngdoc service
 * @name cesgaBDApp.cesgaBDApp
 * @description
 * # cesgaBDApp
 * Service in the cesgaBDApp.
 */
angular.module('cesgaBDApp.components.endpoints.bigdata', [])
.factory('BigdataService', ['$http', function ($http) {
    
  var callTimeout = 10000; //10 seconds
    return {
      listServices: function() {
        var url = '/bigdata/api/v1/services'
        return $http.get(url, {timeout: callTimeout});
      },
      listInstances: function(username, service_name, service_version) {
        var base_url = '/bigdata/api/v1/instances'
        var url = base_url
        
        if(username != "" && username != null){
          url = url + '/' + username
        }else{
          return $http.get(url, {timeout: callTimeout});
        }

        if(service_name != "" && service_name != null){
          url = url + '/' + service_name
        }else{
          return $http.get(url, {timeout: callTimeout}); 
        }

        if(service_version != "" && service_version != null){
          url = url + '/' + service_version
        }else{
          return $http.get(url, {timeout: callTimeout});
        }

        return $http.get(url, {timeout: callTimeout});
      },
      showServiceVersions: function(service_name) {
        var url = '/bigdata/api/v1/services/' + service_name
        return $http.get(url, {timeout: callTimeout});
      },
      showService: function(service_name, service_version) {
        var url = '/bigdata/api/v1/services/' + service_name + '/' + service_version
        return $http.get(url, {timeout: callTimeout});
      },
      showInstance: function(instance_path) {
        var base_url = '/bigdata/api/v1/instances'
        var url = base_url + '/' + instance_path
        //return $http.get(url, {timeout: callTimeout});
        return $http.get(url);
      },
      remove: function(service_type, service_name, instance_id) {
        var base_url = '/bigdata/api/v1/services'
        var url = base_url + '?type='+ service_type + '&name=' + service_name + '&id=' + instance_id
        return $http.delete(url);
      },
      create: function(options) {
        return $http.post('/bigdata/api/v1/services', options, {timeout: callTimeout});
      }
    };
  }]);
