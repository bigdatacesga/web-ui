'use strict';

describe('bigdata.services.bigdata', function() {

  beforeEach(module('bigdata.services.bigdata'));

  var service, mockBackend;

  beforeEach(inject(function(PaasService, $httpBackend) {
    service = PaasService;
    mockBackend = $httpBackend;
  }));

  var dummyInstances;

  beforeEach(function() {
      dummyInstances =
      [
        {
            "result": "success",
            "data": {
                "uri": "jenes/mpi/1.0/7",
                "name": "MpiCluster7"
            }
        },
            {
            "result": "success",
            "data": {
                "uri": "jenes/mpi/2.0/8",
                "name": "MpiCluster8"
            }
        },
        {
            "result": "success",
            "data": {
                "uri": "jenes/slurm/2.3.0/2",
                "name": "MpiCluster2"
            }
        },
        {
            "result": "success",
            "data": {
                "uri": "javier/cdh/5.7.0/1",
                "name": "CDH1"
            }
        },
        {
            "result": "success",
            "data": {
                "uri": "rodrigo/gluster/1/5",
                "name": "RodGlus5"
            }
        },
      ]
  });


    it('should return the list of all active instances', function() {
        var jsons = new Array();
        jsons.push(dummyInstances[0]);
        jsons.push(dummyInstances[1]);
        jsons.push(dummyInstances[2]);
        jsons.push(dummyInstances[3]);
        jsons.push(dummyInstances[4]);
        var dummyResponse = {'instances' : jsons}

        mockBackend.whenGET('/bigdata/api/v1/instances').respond(dummyResponse);
        mockBackend.expectGET('/bigdata/api/v1/instances')

        var instances = [];
            service.listInstances(null,null,null).then(function(response){
            instances = response.data;
        });
        mockBackend.flush();
        expect(instances).toEqual(dummyResponse);
    });

    it('should return a list of a user active instances', function() {
        var jsons = new Array();
        jsons.push(dummyInstances[0]);
        jsons.push(dummyInstances[1]);
        jsons.push(dummyInstances[2]);
        var dummyResponse = {'instances' : jsons}

        mockBackend.whenGET('/bigdata/api/v1/instances/jenes').respond(dummyResponse);
        mockBackend.expectGET('/bigdata/api/v1/instances/jenes')

        var instances = [];
            service.listInstances('jenes', null, null).then(function(response){
            instances = response.data;
        });
        mockBackend.flush();
        expect(instances).toEqual(dummyResponse);
    });

    it('should return a list of a user instances of a specific service', function() {
        var jsons = new Array();
        jsons.push(dummyInstances[0]);
        jsons.push(dummyInstances[1]);
        var dummyResponse = {'instances' : jsons}

        mockBackend.whenGET('/bigdata/api/v1/instances/jenes/mpi').respond(dummyResponse);
        mockBackend.expectGET('/bigdata/api/v1/instances/jenes/mpi')

        var instances = [];
        service.listInstances('jenes', 'mpi', null).then(function(response){
            instances = response.data;
        });
        mockBackend.flush();
        expect(instances).toEqual(dummyResponse);
    });

    it('should return a list of a user instances of a specific service and version', function() {
        var jsons = new Array();
        jsons.push(dummyInstances[0]);
        var dummyResponse = {'instances' : jsons}

        mockBackend.whenGET('/bigdata/api/v1/instances/jenes/mpi/1.0').respond(dummyResponse);
        mockBackend.expectGET('/bigdata/api/v1/instances/jenes/mpi/1.0')

        var instances = [];
        service.listInstances('jenes', 'mpi', '1.0').then(function(response){
            instances = response.data;
        });
        mockBackend.flush();
        expect(instances).toEqual(dummyResponse);
    });

    it('should return a single user instance', function() {
        var jsons = new Array();
        jsons.push(dummyInstances[1]);
        var dummyResponse = {'instances' : jsons}

        mockBackend.whenGET('/bigdata/api/v1/instances/jenes/mpi/2.0/8').respond(dummyResponse);
        mockBackend.expectGET('/bigdata/api/v1/instances/jenes/mpi/2.0/8')

        var instances = [];
        service.showInstance('instances/jenes/mpi/2.0/8').then(function(response){
            instances = response.data;
        });
        mockBackend.flush();
        expect(instances).toEqual(dummyResponse);
    });


  it('should create a new service', function() {
    var data = {
      "slaves.number": 2
    };

    mockBackend.expectPOST('/bigdata/api/v1/services/mpi/1.0',data).respond(201, "instances/jenes/mpi/1.0/1");
    var status;
    var msg = {};
    service.launchInstance(data, "mpi", "1.0").then(function(response){
      status = response.status;
      msg = response.data;
    });
    mockBackend.flush();
    expect(status).toEqual(201);
    expect(msg).toEqual("instances/jenes/mpi/1.0/1")
  });

  afterEach(function() {
    // Ensure that all expects on the $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server responded
    mockBackend.verifyNoOutstandingRequest();
  });

});

