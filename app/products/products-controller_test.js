'use strict';

describe('bigdata.bigdata_services controller', function() {

  beforeEach(module('bigdata.bigdata_services'));

  var ctrl, mockBackend, state;


  beforeEach(inject(function(BigdataService, $httpBackend) {
    mockBackend = $httpBackend;
  }));

  var dummyInstances;
  var dummyServices

  beforeEach(function() {
    dummyServices = {
      "services": [
          "mpi",
          "slurm",
          "gluster",
          "cdh"
      ]
    };

    dummyInstances = {
      "instances": [
      {
        "uri": "jenes/mpi/1.0/7",
        "result":"success",
        "data": {
          "instance_name": "MpiCluster7"
        }
      },
      {
        "uri": "jenes/mpi/2.0/1",
        "result":"failure",
        "message": "TESTING FAIL"
      }
    ]
  }
  });

  beforeEach(inject(function($controller, BigdataService, $q) {
    ctrl = $controller('BigdataCtrl');
  }));

  beforeEach(inject(function($state) {
    spyOn($state, 'go');
    state = $state;
  }));

  it('should load the controller', function() {
    expect(ctrl).toBeDefined();
  });

  it('should have sample instances and services', inject(function($rootScope, $httpBackend) {
    $httpBackend.whenGET('/bigdata/api/v1/services').respond(dummyServices);
    $httpBackend.expectGET('/bigdata/api/v1/services');
    $httpBackend.whenGET('/bigdata/api/v1/instances/jenes').respond(dummyInstances);
    $httpBackend.expectGET('/bigdata/api/v1/instances/jenes');

    $rootScope.$apply();
    ctrl.drawServices();
    ctrl.drawInstances();
    $httpBackend.flush();

    expect(ctrl.services.length).toBe(4);
    expect(ctrl.services[0].name).toEqual('mpi');
    expect(ctrl.services[1].name).toEqual('slurm');
    expect(ctrl.services[2].name).toEqual('gluster');
    expect(ctrl.services[3].name).toEqual('cdh');

    expect(ctrl.instances.length).toBe(2);
    expect(ctrl.instances[0].uri).toEqual("jenes/mpi/1.0/7");
    expect(ctrl.instances[0].name).toEqual("MpiCluster7");
    expect(ctrl.instances[1].uri).toEqual("jenes/mpi/2.0/1");
    expect(ctrl.instances[1].name).toEqual("jenes/mpi/2.0/1");
  }));
});


