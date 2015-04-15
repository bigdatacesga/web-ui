'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.launcher:LauncherCtrl
 * @description 
 * # LauncherCtrl
 * Controller of the launcher view 
 * Allows to launch new clusters with specified parameters
 */
angular.module('hadoopApp.launcher', ['ui.router', 'hadoopApp.wizard_cluster', 'dialogs.main'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('launcher', {
    url:'/launcher',
    templateUrl: 'launcher/launcher.html',
    controller: 'LauncherCtrl',
    controllerAs: 'launcher'
  });
}])

.controller('LauncherCtrl', ['$state','dialogs',function($state,dialogs) {
  dialogs.create("launcher/launcher_modal.html","LauncherModalCtrl");
  
  // Uncomment next line to go back to clusters state before launching, comment otherwise
  $state.go('clusters');
  
  
}])

/*
 * LauncherModalCtrl does not fit angularJS philosophy at all
 * because wizard_cluster uses a previously built wizard under
 * jQuery smartWizard
 */
.controller('LauncherModalCtrl',['$state',function($state){
  self.onLaunch = function onLaunch() {
    // Check if button is disabled
    var disabled = false;
    var invoker = document.getElementById("wizardLaunchButton");
    for(var i=0 ; i < invoker.classList.length ; i++)
      if(invoker.classList.item(i)=="buttonDisabled")
	  disabled=true;
    
      
    if(!disabled){ // If button is NOT disabled
      // Behavior code --
      /*alert('TODO\n'+
	'Overwrite: LauncherModalCtrl.onLaunch @ launcher/launcher.js');*/
      $state.go('clusters');
      window.location.href=window.location.href.replace("/#/launcher","/#/clusters");
      window.location.reload();
      // -- Behavior code
    }
  };
}]);
