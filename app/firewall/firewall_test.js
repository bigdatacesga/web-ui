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
  });
});
 
