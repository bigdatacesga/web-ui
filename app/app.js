'use strict';

// Declare app level module which depends on views, and components
angular
  .module('bigdata', [
    /* Shared modules */
    'bigdata.services.auth-interceptor',
    /* Layout */
    'bigdata.layout.menu',
    /* Features */
    'bigdata.login',
    'bigdata.dashboard',
    'bigdata.hdp',
    'bigdata.cdh',
    'bigdata.products',
    'bigdata.clusters',
    'bigdata.sshkeys',
    'bigdata.firewall',
    'bigdata.help',
    //'bigdata.cloudview',
    /* Third-party */
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar'
  ]);
