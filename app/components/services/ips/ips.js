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
      getAll: function(onIpServiceGetAllSuccess,onIpServiceGetAllError,ips) {
        return $http.get('/hadoop/v1/ip?user=fajlc').success(function (data){
	    onIpServiceGetAllSuccess(data,ips);
	})
	.error(function (data){
	    onIpServiceGetAllError(data,ips);
	});
      },
      get: function(id) {
        return $http.get('/hadoop/v1/ips/'+id);
      },
      remove: function(id,onIpServiceRemoveSuccess,onIpServiceRemoveError,elementToRemove) {
        return $http.delete('/hadoop/v1/ip/'+id).success(function (data){
	  onIpServiceRemoveSuccess(data,elementToRemove);
	})
	.error(function (data){
	  onIpServiceRemoveError(data);
	});
      },
      create: function(address, onIpServiceCreateSuccess, onIpServiceCreateError,ips,newIP){ 
        var ip = { 
          address: address,
          enabled: true 
        };
        return $http.post('/hadoop/v1/ip', ip).success(function (data){
	  onIpServiceCreateSuccess(data,ips,newIP);
	})
	.error(function (data){
	  onIpServiceCreateError(data,ips,newIP);
	});
      },
      // To update an IP use {id: 2, address: "193.144.34.10", enabled: false}
      update: function(ip, onIpServiceUpdateSuccess, onIpServiceUpdateError, toggleRuleCheckbox, undoCheckboxChange) {
        return $http.put('/hadoop/v1/ip', ip).success(function (data){
	  onIpServiceUpdateSuccess(data,toggleRuleCheckbox);
	})
	.error(function (data){
	  onIpServiceUpdateError(data,undoCheckboxChange);
	});
      }
    };
  }]);
