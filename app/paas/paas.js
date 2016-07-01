'use strict';
/**
 * @ngdoc function
 * @name cesgaBDApp.paas
 * @description
 * # HomeCtrl
 * Controller of the home view of the dashboard
 * The home view is also the first view seen by a user
 */
angular.module('cesgaBDApp.paas', ['ui.router', 'cesgaBDApp.stat', 'cesgaBDApp.components.endpoints.bigdata'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('paas', {
            url:'/paas',
            templateUrl: 'paas/paas.html',
            controller: 'PaaSCtrl',
            controllerAs : 'paas',
            data: {
                requireLogin: true
            }
        });
    }])

    .controller('PaaSCtrl', ['BigdataService', '$window', function(BigdataService, $window) {
        var vm = this;
        vm.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


        var errorNumber = "#unknown"
        vm.stats = {
            clusters : {
                link:"#/bigdata_instances",
                comments:"Instances",
                colour:"primary",
                type:"cubes",
                number:errorNumber
            },
            products : {
                link:"#/bigdata_services",
                comments:"Products",
                colour:"primary",
                type:"th-list",
                number:errorNumber
            }
        };



        var receivedData;

        getBigdataInstances();
        function getBigdataInstances() {
            var username = window.sessionStorage.username;
            return BigdataService.listInstances(username,null,null)
                .then(function(data){
                    receivedData = data.data;
                    if(receivedData == undefined){

                    }else{
                        vm.clusters = receivedData.clusters;
                        vm.stats.clusters.number = vm.clusters.length;
                    }
                })
                .catch(function(error) {
                    vm.stats.clusters.number = errorNumber;
                });
        }

        getBigdataServices();
        var errorMessage;
        function getBigdataServices() {
            return BigdataService.listServices()
                .then(function(data){
                    receivedData = data.data;
                    if(receivedData == undefined){
                        errorMessage = "Sorry :( , it seems we could not get info from the server, it may be down.";
                        alert(errorMessage);
                    }else{
                        vm.products = receivedData.products;
                        vm.stats.products.number = vm.products.length;
                    }
                })
                .catch(function(error) {
                    vm.stats.products.number = errorNumber;
                });
        }

    }]);
