'use strict';
/**
 * @ngdoc function
 * @name bigdata.cdh
 * @description
 * # CDHCtrl
 * Controller of the CDH proxies view
 */
angular.module('bigdata.cdh', ['ui.router', 'bigdata.components.stat'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('cdh', {
            url: '/cdh',
            templateUrl: 'cdh/cdh.html',
            controller: 'CDHCtrl',
            controllerAs : 'cdh',
            data: {
                requireLogin: true
            }
        });
    }])

    .controller('CDHCtrl', [function() {
        var vm = this;

        vm.proxies = [
            {
                link: 'https://c14-19.bd.cluster.cesga.es:8889/',
                name: 'HUE',
                colour: 'green',
                image: 'assets/images/hue-icon.png'
            },
            {
                link: 'https://c14-18.bd.cluster.cesga.es:8090',
                name: 'YARN',
                colour: 'yellow',
                image: 'assets/images/hadoop-logo.png'
            },
            {
                link: 'https://c14-18.bd.cluster.cesga.es:18488',
                name:'Spark',
                colour:'pink',
                image: 'assets/images/spark-icon.png'
            },
            {
                link: 'https://c14-19.bd.cluster.cesga.es:19890/jobhistory',
                name: 'MR2',
                colour: 'blue',
                image: 'assets/images/mapreduce.png'
            },
            {
                link: 'http://hadoop.cesga.es/#tutorials',
                name: 'Tutorials',
                colour: 'red',
                image: 'assets/images/history-icon.png'
            }
        ];
    }]);
