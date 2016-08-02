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
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.timeout = 9000; // milliseconds
    
    }])
    .factory('PaasService', ['$http', function ($http) {
      var callTimeout = 1000000; // miliseconds

      //TODO: Refactor
      function listInstances(username, service_name, service_version) {
          var base_url = '/bigdata/api/v1/clusters';
          var url = base_url;

          if(username != "" && username != null){
            url = url + '/' + username;
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
      }

      return {
        listServices: function() {
          return $http.get('/bigdata/api/v1/products');
        },
        listInstances: listInstances,
        showServiceVersions: function(service_name) {
          return $http.get('/bigdata/api/v1/products/' + service_name);
        },
        showService: function(service_name, service_version) {
          return $http.get('/bigdata/api/v1/products/' + service_name + '/' + service_version);
        },
        getProductOptions: function(service_name, service_version){
          return $http.get('/bigdata/api/v1/products/' + service_name + '/' + service_version + '/' + 'options');
        },
        showInstance: function(instance_path) {
          return $http.get('/bigdata/api/v1' + '/' + instance_path);
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
