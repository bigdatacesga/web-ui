/**
 * @ngdoc service
 * @name bigdata.services.paas
 * @description
 * Service to communicate with the Big Data PaaS backend
 */

(function() {
  'use strict';
  angular
    .module('bigdata.services.paas', [])
    .factory('PaasService', ['$http', function ($http) {
      var callTimeout = 1000000; // seconds
      return {
        listServices: function() {
          var url = '/bigdata/api/v1/products'
          return $http.get(url, {timeout: callTimeout});
        },
        listInstances: function(username, service_name, service_version) {
          var base_url = '/bigdata/api/v1/clusters'
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
          var url = '/bigdata/api/v1/products/' + service_name
          return $http.get(url, {timeout: callTimeout});
        },
        showService: function(service_name, service_version) {
          var url = '/bigdata/api/v1/products/' + service_name + '/' + service_version
          return $http.get(url, {timeout: callTimeout});
        },
        getProductOptions: function(service_name, service_version){
          var url = '/bigdata/api/v1/products/' + service_name + '/' + service_version + '/' + 'options'
          return $http.get(url, {timeout: callTimeout});
        },
        showInstance: function(instance_path) {
          //var base_url = '/bigdata/api/v1/instances'
          var base_url = '/bigdata/api/v1'
          var url = base_url + '/' + instance_path
          //return $http.get(url, {timeout: callTimeout});
          return $http.get(url);
        },
        showInstanceNodes: function(instance_path) {
          //var base_url = '/bigdata/api/v1/instances'
          var base_url = '/bigdata/api/v1';
          var url = base_url + '/' + instance_path + '/' + 'nodes'
          //return $http.get(url, {timeout: callTimeout});
          return $http.get(url);
        },
        destroyInstance: function(instance_path) {
          //var base_url = '/bigdata/api/v1/instances'
          var base_url = '/bigdata/api/v1'
          var url = base_url + '/' + instance_path
          return $http.delete(url);
        },
        launchInstance: function(options, service_name, service_version) {
          //return $http.post('/bigdata/api/v1/services/' + service_name + '/' + service_version, options, {timeout: callTimeout});
          return $http.post('/bigdata/api/v1/products/' + service_name + '/' + service_version, options);
        },
        testAuth: function() {
          return $http.get('/bigdata/api/v1/test');
        }
      };
    }]);
})();
