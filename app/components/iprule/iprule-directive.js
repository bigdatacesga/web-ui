'use strict';

/**
 * @ngdoc directive
 * @name bigdata.iprule.iprule-directive:iprule
 * @description
 * # stats
 */
angular.module('bigdata.iprule.iprule-directive', ['bigdata.components.endpoints.ips'])

.directive('iprule', ['IpService', function(IpService) {
    return{
        templateUrl:'components/iprule/iprule.html',
        restrict: 'E',
        scope: {
            ipruleData: '='
        },
        
        link: function(scope, element, attrs) {
            var vmRule = scope;

            // --- REMOVE RULE //
            scope.removeRule = function() {
                this.onIpServiceRemoveSuccess = function(data){
                    element.html('');
                };

                this.onIpServiceRemoveError = function(data){
                    alert('The IP could not be removed due to a server-side error.\n'+
                        'Please notify administrator');
                };
                
                IpService.remove(scope.ipruleData.id).success(function (data){
                  vmRule.onIpServiceRemoveSuccess(data);
                }).error(function (data){
                  vmRule.onIpServiceRemoveError(data);
                });
            };
            // REMOVE RULE --- //
          
          
            // --- RULE UPDATE //
            scope.toggleRule = function() {
                this.toggleRuleCheckbox = function (){
                    scope.ipruleData.enabled = !scope.ipruleData.enabled;
                };

                this.undoCheckboxChange = function (){
                    scope.stateCheckbox = !scope.stateCheckbox;
                };

                this.onIpServiceUpdateSuccess = function(data){
                    this.toggleRuleCheckbox();
                };

                this.onIpServiceUpdateError = function(data){
                    alert('Rule state could not be updated due to a server-side error.\n' +
                        'Please notify administrador');
                    this.undoCheckboxChange();
                };

                this.ipServiceUpdateData = {
                    id: scope.ipruleData.id,
                    address: scope.ipruleData.address,
                    mask: scope.ipruleData.mask,
                    enabled: !scope.ipruleData.enabled
                };
            
                IpService.update(this.ipServiceUpdateData).success(function (data){
                    vmRule.onIpServiceUpdateSuccess(data);
                }).error(function (data){
                    vmRule.onIpServiceUpdateError(data);
                });
            };
            // RULE UPDATE --- //
        
            //RULE GET --- //  
            scope.getStateCheckboxChecked= function() {
                return vmRule.ipruleData.enabled;
            };
              
            scope.getRuleText = function() {
                return vmRule.ipruleData.address + ((vmRule.ipruleData.mask > 0) ? ' / ' + vmRule.ipruleData.mask : '');
            };
              
            scope.getRuleTextStyle = function() {
                
                if(vmRule.ipruleData.enabled == false){
                    return "color: #888; text-decoration: line-through";
                }
                return "color: #000";
            };
            //RULE GET --- //  
        },
    };
}]);