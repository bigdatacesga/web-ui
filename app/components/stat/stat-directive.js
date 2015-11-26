'use strict';

/**
 * @ngdoc directive
 * @name hadoopApp.stat:stat
 * @description
 * # stat
 */
    angular.module('hadoopApp.stat.stat-directive', ['hadoopApp.service.clusters'])
        .directive('stat',[ 'ClusterService', function(ClusterService) {
            return {
                templateUrl:'components/stat/stat.html',
                restrict:'E',
                scope: {
                    statData: '=',
                },
                link: function(scope, element, attrs) {
                    // var vmState = scope;
                    // vmState.statData.number = 0;

                    // // Cluster Number
                    // if(vmState.statData.link == '#/clusters'){
                    //   ClusterService.list()
                    //   .then(function(data){
                    //     vmState.statData.number = data.data.length;
                    //   })
                    //   .catch(function(error) {
                    //     vmState.statData.number = 80
                    //   });
                    // }

                    // // IP Number
                    // if(vmState.statData.link == '#/ips'){
                    //   IpService.list()
                    //   .then(function(data){
                    //     vmState.statData.number = data.data.length;
                    //   })
                    //   .catch(function(error) {
                    //     vmState.statData.number = 80
                    //   });
                    // }

                    // // SSHKEY Number
                    // if(vmState.statData.link == '#/sshkey'){
                    //   ClusterService.list()
                    //   .then(function(data){
                    //     vmState.statData.number = data.data.length;
                    //   })
                    //   .catch(function(error) {
                    //     vmState.statData.number = 80
                    //   });
                    // }

                    
                }
            }
    }]);
