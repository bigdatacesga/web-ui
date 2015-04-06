'use strict';

describe('hadoopApp.clusters module', function() {

  beforeEach(module('hadoopApp.clusters'));

  describe('clusters controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var homeCtrl = $controller('ClustersCtrl');
      expect(homeCtrl).toBeDefined();
    }));

    it('should have awesome items', inject(function($controller) {
      //spec body
      var ctrl = $controller('ClustersCtrl');
      expect(ctrl.awesomeThings.length).toBe(3);
    }));

  });
});
