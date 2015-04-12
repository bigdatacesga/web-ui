'use strict';

describe('hadoopApp.clusters module', function() {

  beforeEach(module('hadoopApp.clusters'));

  beforeEach(inject(function($state) {
    spyOn($state, 'go');
  }));

  describe('clusters controller', function(){

    it('should load', inject(function($controller) {
      var ctrl = $controller('ClustersCtrl');
      expect(ctrl).toBeDefined();
    }));

    it('should have sample clusters', inject(function($controller) {
      var ctrl = $controller('ClustersCtrl');
      expect(ctrl.clusters.length).toBe(2);
    }));

    it('should launch the new cluster wizard', inject(function($controller, $state) {
      var ctrl = $controller('ClustersCtrl');
      //expect($state.is('clusters')).toBe(true);
      ctrl.launchClusterWizard();
      expect($state.go).toHaveBeenCalledWith('launcher');
    }));

  });
});
