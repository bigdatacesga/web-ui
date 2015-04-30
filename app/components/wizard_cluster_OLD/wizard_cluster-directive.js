'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.wizard_cluster.wizard_cluster-directive:wizard_cluster
 * @description
 * # wizard_cluster
 */
angular.module('hadoopApp.wizard_cluster.wizard_cluster-directive', [])

.directive('wizardcluster', function($timeout){ 
   function link(scope, element, attrs) {
	// This function purpose is to call ClusterService.setup AFTER load template from url.
	$(ClusterService.setup);
   }
   return {
     link: link,
     templateUrl:'components/wizard_cluster/wizard_cluster.html',
     restrict: 'E',
   }
});

