/**
 * @ngdoc service
 * @name bigdata.services.logger
 * @description
 * Generic logger wrapping $log
 */
(function() {
  'use strict';
  angular
    .module('bigdata.services.logger', [])
    .factory('logger', ['$log', logger]);

  function logger($log) {
    function log(msg) {
      return $log.log(msg);
    }
    function info(msg) {
      return $log.info(msg);
    }
    function warn(msg) {
      return $log.warn(msg);
    }
    function error(msg) {
      return $log.error(msg);
    }
    function debug(msg) {
      return $log.debug(msg);
    }
    return {
      log: log,
      info: info,
      warn: warn,
      error: error,
      debug: debug
    };
  }
})();
