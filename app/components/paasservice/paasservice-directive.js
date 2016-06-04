'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.bigdataInstance.bigdataInstance-directive:bigdataInstance
 * @description
 * # stats
 */
angular.module('cesgaBDApp.paasservice.paasservice-directive', ['cesgaBDApp.components.endpoints.bigdata', 'cesgaBDApp.components.endpoints.bigdata.nodes'])

.directive('paasservice', ['BigdataService' ,function(BigdataService) {
  return {
    templateUrl:'components/paasservice/paasservice.html',
    restrict: 'E',
    replace: true,
    scope: {
      paasserviceData: '=',
      showDetails: '@'
    },
    link: function(scope, element, attrs) {
      var vmService = scope;
      

      vmService.paasserviceData.services = [];
      vmService.showDetails = 'false';


      vmService.toggleDetails = function() {
        if(vmService.showDetails == 'false') {
          BigdataService.showServiceVersions(vmService.paasserviceData.name).success(function (data){
            for (var v in data.versions){
                BigdataService.showService(vmService.paasserviceData.name, data.versions[v]).success(function (data, status){
                  if (status == 200){
                    vmService.paasserviceData.services.push(data)
                  }else{
                    // Skip this service-version
                  }
                }).error(function (data){
                   alert('Could not get the service info');
                });
            }
            vmService.showDetails = 'true';
          }).error(function (data){
             alert('Could not get the version');
             vmService.showDetails = 'true';
          });

        } else {
          vmService.showDetails = 'false';
          vmService.paasserviceData.services = []
        }
      };


      vmService.isCollapsed = function() {
          return vmService.showDetails == 'false';
      };






    },
  };
}]);
