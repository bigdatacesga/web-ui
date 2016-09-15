'use strict';
/**
 * @ngdoc function
 * @name bigdata.hdp
 * @description
 * # HDPCtrl
 * Controller of the HDP proxies view
 */
angular.module('bigdata.hdp', ['ui.router', 'bigdata.components.stat'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('hdp', {
            url: '/hdp',
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

        vm.proxies = [
            {
                link: 'http://yarn.hdp.cesga.es:8088',
                name: 'YARN',
                colour: 'yellow',
                image: 'assets/images/hadoop-logo.png'
            },
            {
                link: 'http://mapreduce.hdp.cesga.es:19888',
                name: 'MR2',
                colour: 'blue',
                image: 'assets/images/mapreduce.png'
            },
            {
                link: 'http://spark.hdp.cesga.es:18080',
                name:'Spark',
                colour:'pink',
                image: 'assets/images/spark-icon.png'
            },
            {
                link: 'http://namenode.hdp.cesga.es:50070',
                name: 'HDFS',
                colour: 'yellow',
                image: 'assets/images/hdfs.png'
            },
            {
                link: 'http://hue.hdp.cesga.es:8888',
                name: 'HUE',
                colour: 'green',
                image: 'assets/images/hue-icon.png'
            },
            {
                link:'http://zeppelin.hdp.cesga.es:9995',
                name:'Zeppelin',
                colour:'red',
                image: 'assets/images/zeppelin-icon.png'
            }
        ];
    }]);
