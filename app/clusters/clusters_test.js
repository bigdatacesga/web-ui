'use strict';

describe('hadoopApp.clusters module', function() {

  beforeEach(module('hadoopApp.clusters'));

  describe('clusters controller', function(){

    it('should load', inject(function($controller) {
      var ctrl = $controller('ClustersCtrl');
      expect(ctrl).toBeDefined();
    }));

    it('should have sample clusters', inject(function($controller) {
      var ctrl = $controller('ClustersCtrl');
      expect(ctrl.clusters.length).toBe(2);
    }));

    it('should have as many collapse options as sample clusters', inject(function($controller) {
      var ctrl = $controller('ClustersCtrl');
      expect(Object.keys(ctrl.isCollapsed).length).toBe(ctrl.clusters.length);
    }));

    it('should allow to toggle details changing collapse option', inject(function($controller) {
      var ctrl = $controller('ClustersCtrl');
      var clusterId = ctrl.clusters[0].id;
      ctrl.toggleDetails(clusterId);
      expect(ctrl.isCollapsed[clusterId]).toBe(false);
      ctrl.toggleDetails(clusterId);
      expect(ctrl.isCollapsed[clusterId]).toBe(true);
    }));

  });
});
