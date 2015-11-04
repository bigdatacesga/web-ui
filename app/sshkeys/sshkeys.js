'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.sshkeys:SSHKeysCtrl
 * @description 
 * # SSHKeysCtrl
 * Controller of the sshkeys view 
 * Allows to see registered ssh keys and to add new keys
 */
angular.module('hadoopApp.sshkeys', ['ui.router', 'hadoopApp.sshkey', 'hadoopApp.service.keys'])

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
  vm.newkey = { pubkey: '', type: '' };

  vm.addKey = function(){
    KeyService.create(vm.newkey)
    .then(function(success) {
        activate();
      })
      .catch(function(error) {
        if(error.status == 401){
          alert("You need to authenticate");
          $state.go('login');
        }else{
          vm.errorMessage = 'Unable to connect to the Big Data service';
        }
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
  //TODO: Errors should be handled globally in a $http interceptor
  //      eg. status=401 -> redirect to login page
  }

}]);
 
