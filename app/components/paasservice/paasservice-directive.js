'use strict';

/**
 * @ngdoc directive
 * @name cesgaBDApp.bigdataInstance.bigdataInstance-directive:bigdataInstance
 * @description
 * # stats
 */
angular.module('cesgaBDApp.paasservice.paasservice-directive', ['cesgaBDApp.components.endpoints.bigdata', 'cesgaBDApp.components.endpoints.bigdata.nodes'])

.directive('paasservice', ['BigdataService', '$uibModal' ,function(BigdataService, $uibModal) {
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
      

      vmService.paasserviceData.versions = [];
      vmService.showDetails = 'false';


      vmService.toggleDetails = function() {
        if(vmService.showDetails == 'false') {
          BigdataService.showServiceVersions(vmService.paasserviceData.name).success(function (data){
            for (var v in data.versions){
                BigdataService.showService(vmService.paasserviceData.name, data.versions[v]).success(function (data, status){
                  if (status == 200){
                    var newService = {
                      "description": data.description,
                      "name": data.name,
                      "version": data.version
                      //"options": JSON.parse(data.options)
                    }
                    vmService.paasserviceData.versions.push(newService)
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
          vmService.paasserviceData.versions = []
        }
      };


      vmService.isCollapsed = function() {
          return vmService.showDetails == 'false';
      };
      
      vmService.launchInstance = function(index) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'bigdata_services/partials/launch.html',
            controller: 'ModalInstanceCtrlBigdata',
            controllerAs: 'modal',
            size: 'lg',
            resolve: {
              serviceInfo: function () {
                return vmService.paasserviceData.versions[index];
              }
            }
          });
        };

      vmService.seeDetails = function(index) {
          //vmService.paasserviceData.services = ["asdf"];
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'bigdata_services/partials/details.html',
            controller: 'ModalInstanceCtrlBigdata',
            controllerAs: 'modal',
            size: 'lg',
            resolve: {
              serviceInfo: function () {
                return vmService.paasserviceData.versions[index];
              }
            }
          });
        };
      
    },
  };
}]);
