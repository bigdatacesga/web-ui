'use strict';

/**
 * @ngdoc service
 * @name cesgaBDApp.cesgaBDApp
 * @description
 * # cesgaBDApp
 * Service in the cesgaBDApp.
 */
angular.module('cesgaBDApp.components.endpoints.multinodes', [])
.factory('MultinodeService', ['$http', function ($http) {
    
  var callTimeout = 10000; //10 seconds
    return {
      list: function(service_type, service_name) {
        var base_url = '/bigdata/api/v1/services/'
        var url = base_url
        if(service_type != "" && service_type != null){
          url = url + '?type='+ service_type
        }else{
          return $http.get(url);  
        }
        if(service_name != "" && service_name != null){
          url = url + '&name='+service_name
        }
        return $http.get(url, {timeout: callTimeout});
      },
      show: function(service_type, service_name, instance_id) {
        var base_url = '/bigdata/api/v1/services/'
        var url = base_url + '?type='+ service_type + '&name=' + service_name + '&id=' + instance_id
        return $http.get(url, {timeout: callTimeout});
      },
      remove: function(service_type, service_name, instance_id) {
        var base_url = '/bigdata/api/v1/services/'
        var url = base_url + '?type='+ service_type + '&name=' + service_name + '&id=' + instance_id
        return $http.delete(url);
      },
      create: function(options) {
        return $http.post('/bigdata/api/v1/services/', options, {timeout: callTimeout});
      }
    };
  }]);
