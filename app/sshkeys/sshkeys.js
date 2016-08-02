'use strict';
/**
 * @ngdoc function
 * @name bigdata.sshkeys:SSHKeysCtrl
 * @description 
 * # SSHKeysCtrl
 * Controller of the sshkeys view 
 * Allows to see registered ssh keys and to add new keys
 */
angular.module('bigdata.sshkeys', ['ui.router', 'bigdata.sshkey', 'bigdata.components.endpoints.keys'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('sshkeys', {
    url:'/sshkeys',
    templateUrl: 'sshkeys/sshkeys.html',
    controller: 'SSHKeysCtrl',
    controllerAs: 'sshkeys'
  });
}])

.controller('SSHKeysCtrl', ['KeyService', function(KeyService) {

  var vm = this;

  vm.keys = [];
  vm.newkey = { pubkey: '', type: 'droppedAttribute' };

  vm.addKey = function(){
    KeyService.create(vm.newkey)
    .then(function(success) {
        activate();
      })
      .catch(function(error) {
        alert("You need to authenticate");
        $log.info('Status: ' + error.status);
        $log.info('Error message: '+ error.data.message);
      });
  };

  activate();

  function activate() {
    return KeyService.getAll()
      .then(function(data){
        vm.keys = data.data;
      })
      .catch(function(error) {
        vm.errorMessage = 'Unable to connect to the Big Data service';
        $log.warn(vm.errorMessage);
        $log.info('Status: ' + error.status);
        $log.info('Error message: '+ error.data.message);
      });
  }

}]);
 
