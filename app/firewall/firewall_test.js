'use strict';

describe('hadoopApp.firewall module', function() {

  beforeEach(module('hadoopApp.firewall'));

  beforeEach(inject(function($state) {
    spyOn($state, 'go');
  }));

  describe('firewall controller', function(){

    it('should load', inject(function($controller) {
      var ctrl = $controller('FirewallCtrl');
      expect(ctrl).toBeDefined();
    }));

    /*
     * Code below is commented because now IPs are obtained through "ips" service which has its own tests
     */
     /* it('should have 3 sample ips', inject(function($controller) {
      var ctrl = $controller('FirewallCtrl');
      expect(ctrl.ips.length).toBe(4);
    }));*/


  });
});
 
