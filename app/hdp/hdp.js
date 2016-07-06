'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.paas
 * @description
 * # HomeCtrl
 * Controller of the home view of the dashboard
 * The home view is also the first view seen by a user
 */
angular.module('cesgaBDApp.hdp', ['ui.router', 'cesgaBDApp.stat'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('hdp', {
            url:'/hdp',
            templateUrl: 'hdp/hdp.html',
            controller: 'HDPCtrl',
            controllerAs : 'hdp',
            data: {
                requireLogin: true
            }
        });
    }])

    .controller('HDPCtrl', [function() {
        var vm = this;
        vm.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        vm.stats = {
            yarn : {
                link:"http://hadoop.cesga.es/yarn/",
                comments:"YARN",
                colour:"primary",
                type:"database"
            },
            jobhistory : {
                link:"http://hadoop.cesga.es/jobhistory/",
                comments:"Jobhistory",
                colour:"primary",
                type:"database"
            },
            hue : {
                link:"http://hue.hdp.cesga.es:8888/",
                comments:"HUE",
                colour:"primary",
                type:"database"
            },
            zeppelin : {
                link:"http://hadoop.cesga.es/zeppelin/",
                comments:"Zeppelin",
                colour:"primary",
                type:"database"
            },
            spark : {
                link:"http://hadoop.cesga.es/spark/",
                comments:"Spark",
                colour:"primary",
                type:"database"
            }
        };
    }]);
