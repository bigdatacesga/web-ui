'use strict';

describe('cesgaBDApp.multinode_services controller', function() {

  beforeEach(module('cesgaBDApp.multinode_services'));

  var ctrl, mockService, dummyServices, state;

  beforeEach(function() {
    dummyServices = {
      "services": [
        {
          "clustername": "My MPI cluster", 
          "cpu": 4, 
          "masterIP": "10.112.13.110", 
          "mem": 2048, 
          "num_nodes": 2, 
          "service_full_name": "MPI-jenes-1", 
          "instance_id": 1, 
          "service_name": "MPI", 
          "service_type": "multi", 
          "service_username": "jenes"
        }, 
        {
          "clustername": "My Slurm cluster", 
          "cpu": 12,  
          "masterIP": "10.112.13.120", 
          "mem": 6168, 
          "num_nodes": 3, 
          "service_full_name": "Slurm-jenes-2", 
          "instance_id": 2, 
          "service_name": "Slurm", 
          "service_type": "multi", 
          "service_username": "jenes"
        }
      ]
    };
  });

  beforeEach(inject(function($controller, MultinodeService, $q) {
    ctrl = $controller('MultinodeCtrl');
  }));

  beforeEach(inject(function($state) {
    spyOn($state, 'go');
    state = $state;
  }));

  it('should load the controller', function() {
    expect(ctrl).toBeDefined();
  });

  it('should have sample services', inject(function($rootScope, $httpBackend) {
    $httpBackend.whenGET('/bigdata/api/v1/services/?type=multi').respond(dummyServices);
    $httpBackend.expectGET('/bigdata/api/v1/services/?type=multi');
    $rootScope.$apply();
    ctrl.activate();
    $httpBackend.flush();
    expect(ctrl.services.length).toBe(2);
    expect(ctrl.services[0].clustername).toEqual('My MPI cluster');
    expect(ctrl.services[1].clustername).toEqual('My Slurm cluster');
  }));
});


