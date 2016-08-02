'use strict';

describe('bigdata.firewall module', function() {

  beforeEach(module('bigdata.firewall'));

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
 
