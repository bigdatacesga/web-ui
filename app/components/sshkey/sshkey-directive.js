'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.sshkey.sshkey-directive:sshkey
 * @description
 * # stats
 */
angular.module('hadoopApp.sshkey.sshkey-directive', ['hadoopApp.service.keys']) 

.directive('sshkey', ['KeyService', function(KeyService) {
    return{
        templateUrl:'components/sshkey/sshkey.html',
        restrict: 'E',
        scope: {
            sshkeyData: '=',
            expandedKey: '@'
        },

        link: function(scope, element, attrs) {
            var vmKey = scope;

            // --- REMOVE KEY //
            scope.removeKey = function() {
                this.onKeyServiceRemoveSuccess = function(data){
                    element.html('');
                };

                this.onKeyServiceRemoveError = function(data){
                    alert('The Key could not be removed due to a server-side error.\n'+
                        'Please notify administrator');
                };
                
                KeyService.remove(scope.sshkeyData.id).success(function (data){
                  vmKey.onKeyServiceRemoveSuccess(data);
                }).error(function (data){
                  vmKey.onKeyServiceRemoveError(data);
                });
            };
            // --- REMOVE KEY //

            // --- GET KEY //
            vmKey.expandShortenKey = function() {
                if(vmKey.expandedKey=='true'){
                    vmKey.expandedKey = 'false';
                }else{
                    vmKey.expandedKey = 'true';
                }
            };
            
            vmKey.isExpanded = function() {
                if(vmKey.expandedKey=='true')
                    return false;
                return true;
            };
            
            vmKey.isNotExpanded = function() {
                if(vmKey.expandedKey=='true')
                    return true;
                return false;
            };
            // --- GET KEY //

            // --- KEY UPDATE //
            vmKey.toggleRule = function() {
                this.toggleRuleCheckbox = function (){
                    vmKey.sshkeyData.enabled = !vmKey.sshkeyData.enabled;
                };

                this.undoCheckboxChange = function (){
                    vmKey.stateCheckbox = !vmKey.stateCheckbox;
                };

                this.onKeyServiceUpdateSuccess = function(data){
                    this.toggleRuleCheckbox();
                };

                this.onKeyServiceUpdateError = function(data){
                    alert('Rule state could not be updated due to a server-side error.\n' +
                        'Please notify administrador');
                    this.undoCheckboxChange();
                };

                this.keyServiceUpdateData = {
                    id: scope.sshkeyData.id,
                    pubkey: scope.sshkeyData.pubkey,
                    type: scope.sshkeyData.type,
                    enabled: !scope.sshkeyData.enabled
                };
            
                KeyService.update(this.keyServiceUpdateData).success(function (data){
                    vmKey.onKeyServiceUpdateSuccess(data);
                }).error(function (data){
                    vmKey.onKeyServiceUpdateError(data);
                });
            };

            vmKey.getStateCheckboxChecked= function() {
                return vmKey.sshkeyData.enabled;
            };
              
            vmKey.getKeyTextStyle = function() {
                
                if(vmKey.sshkeyData.enabled == false){
                    return "color: #888; text-decoration: line-through";
                }
                return "color: #000";
            };
            // KEY UPDATE --- //
        },
    };
}]);