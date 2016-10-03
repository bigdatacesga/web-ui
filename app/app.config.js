(function() {

  'use strict';

  angular
    .module('bigdata')
    .config(['$stateProvider','$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
      // For any unmatched url, redirect to /dashboard
      $urlRouterProvider.otherwise('/hdp');
    }])
    .run(['$rootScope', '$state', '$log', function($rootScope, $state, $log) {
      $rootScope.$on('unauthorized', function(event, data) {
        $log.info('Redirecting to login page');
        $state.transitionTo('login');
      });
    }]);

})();
