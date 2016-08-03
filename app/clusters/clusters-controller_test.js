'use strict';

describe('bigdata.clusters ClusterCtrl controller', function() {

  beforeEach(module('bigdata.clusters'));

  var ctrl, mockService, dummyClusters, state;

  beforeEach(inject(function($state) {
    spyOn($state, 'go');
    state = $state;
  }));

  beforeEach(inject(function($controller) {
    ctrl = $controller('ClustersCtrl');
  }));

  it('should load', function() {
    expect(ctrl).toBeDefined();
  });

});


