'use strict';
/**
 * @ngdoc function
 * @name bigdata.paas
 * @description
 * # HomeCtrl
 * Controller of the home view of the dashboard
 * The home view is also the first view seen by a user
 */
angular.module('bigdata.hdp', ['ui.router', 'bigdata.components.stat'])

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

        vm.stats = {
            yarn : {
                link:"http://hadoop.cesga.es/yarn/",
                comments:"YARN",
                colour:"yellow",
                image: "assets/images/hadoop-logo.png"
            },
            jobhistory : {
                link:"http://hadoop.cesga.es/jobhistory/",
                comments:"Jobhistory",
                colour:"blue",
                image: "assets/images/history-icon.png"
            },
            hue : {
                link:"http://hue.hdp.cesga.es:8888/",
                comments:"HUE",
                colour:"green",
                image: "assets/images/hue-icon.png"
            },
            zeppelin : {
                link:"http://hadoop.cesga.es/zeppelin/",
                comments:"Zeppelin",
                colour:"red",
                image: "assets/images/zeppelin-icon.png"
            },
            spark : {
                link:"http://hadoop.cesga.es/spark/",
                comments:"Spark",
                colour:"pink",
                image: "assets/images/spark-icon.png"
            }
        };
    }]);
