'use strict';

describe('cesgaBDApp.dashboard module', function() {

  beforeEach(module('cesgaBDApp.dashboard'));

  describe('dashboard controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var dashboardCtrl = $controller('DashboardCtrl');
      expect(dashboardCtrl).toBeDefined();
    }));

    it('should have awesome items', inject(function($controller) {
      //spec body
      var dashboardCtrl = $controller('DashboardCtrl');
      expect(dashboardCtrl.awesomeThings.length).toBe(3);
    }));

  });
});
