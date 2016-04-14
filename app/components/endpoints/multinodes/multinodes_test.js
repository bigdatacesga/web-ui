'use strict';

describe('cesgaBDApp.components.endpoints.multinodes', function() {

  beforeEach(module('cesgaBDApp.components.endpoints.multinodes'));

  var service, mockBackend;

  beforeEach(inject(function(MultinodeService, $httpBackend) {
    service = MultinodeService;
    mockBackend = $httpBackend;
  }));

  var dummyServices;
  var dummyDeleteMsg = {"result":"success"};
  var dummyPostMsg= {"result":"success"};

  beforeEach(function() {
      dummyServices = 
      {
      "services": [
        {
          "clustername": "My MPI cluster", 
          "cpu": 4, 
          "masterIP": "10.112.13.110", 
          "mem": 2048, 
          "num_nodes": 2, 
          "service_full_name": "MPI-jenes-1", 
          "service_id": 1, 
          "service_name": "MPI", 
          "service_type": "multi", 
          "service_username": "jenes"
        },
        {
          "clustername": "My Slurm cluster Nº 1", 
          "cpu": 12,  
          "masterIP": "10.112.13.120", 
          "mem": 6168, 
          "num_nodes": 3, 
          "service_full_name": "Slurm-jenes-1", 
          "service_id": 1, 
          "service_name": "Slurm", 
          "service_type": "multi", 
          "service_username": "jenes"
        },
        {
          "clustername": "My Slurm cluster Nº 2", 
          "cpu": 12,  
          "masterIP": "10.112.13.130", 
          "mem": 6168, 
          "num_nodes": 3, 
          "service_full_name": "Slurm-jenes-2", 
          "service_id": 2, 
          "service_name": "Slurm", 
          "service_type": "multi", 
          "service_username": "jenes"
        },
        {
          "clustername": "Test HBase", 
          "cpu": 4, 
          "masterIP": "10.112.13.160", 
          "mem": 2048, 
          "num_nodes": 1, 
          "service_full_name": "HBase-jenes-1", 
          "service_id": 1, 
          "service_name": "HBase", 
          "service_type": "single", 
          "service_username": "jenes"
        },
        {
          "clustername": "Test RStudio", 
          "cpu": 4, 
          "masterIP": "10.112.13.170", 
          "mem": 2048, 
          "num_nodes": 1, 
          "service_full_name": "RStudio-jenes-1", 
          "service_id": 1, 
          "service_name": "RStudio", 
          "service_type": "single", 
          "service_username": "jenes"
        }
      ]
    }
  });


  it('should return the list of active services', function() {
    mockBackend.expectGET('/bigdata/api/v1/services/').respond(dummyServices);
    var services = [];
    service.list().then(function(response){
      services = response.data;
    });
    mockBackend.flush();
    expect(services).toEqual(dummyServices); 
  });

  it('should return a list of a given type of service (multi)', function() {
    var jsons = new Array();
    jsons.push(dummyServices[0]);
    jsons.push(dummyServices[1]);
    jsons.push(dummyServices[2]);
    var dummyResponse = {'services' : jsons}

    mockBackend.expectGET('/bigdata/api/v1/services/?type=multi').respond(dummyResponse);
    var services = [];
    service.list('multi').then(function(response){
      services = response.data;
    });
    mockBackend.flush();
    expect(services).toEqual(dummyResponse); 
  });

  it('should return a list of a given type of service (single)', function() {
    var jsons = new Array();
    jsons.push(dummyServices[3]);
    jsons.push(dummyServices[4]);
    var dummyResponse = {'services' : jsons}

    mockBackend.expectGET('/bigdata/api/v1/services/?type=single').respond(dummyResponse);
    var services = [];
    service.list('single').then(function(response){
      services = response.data;
    });
    mockBackend.flush();
    expect(services).toEqual(dummyResponse); 
  });

  it('should return a list of a given type and name of service (multi, Slurm)', function() {
    var jsons = new Array();
    jsons.push(dummyServices[1]);
    jsons.push(dummyServices[2]);
    var dummyResponse = {'services' : jsons}

    mockBackend.expectGET('/bigdata/api/v1/services/?type=multi&name=slurm').respond(dummyResponse);
    var services = [];
    service.list('multi', 'slurm').then(function(response){
      services = response.data;
    });
    mockBackend.flush();
    expect(services).toEqual(dummyResponse); 
  });

  it('should return a single service from a type, name and id (multi, Slurm, 2)', function() {
    var jsons = new Array();
    jsons.push(dummyServices[2]);
    var dummyResponse = {'services' : jsons}

    mockBackend.expectGET('/bigdata/api/v1/services/?type=multi&name=slurm&id=2').respond(dummyResponse);
    var services = [];
    service.show('multi', 'slurm', '2').then(function(response){
      services = response.data;
    });
    mockBackend.flush();
    expect(services).toEqual(dummyResponse); 
  });


  it('should create a new service', function() {
    var data = {
      clusterName: "My Slurm Cluster",
      clusterSize: 2,
      ServiceName: "Slurm",
      NodeCpus : "2",
      NodeMemory: "1024"
    };

    mockBackend.expectPOST('/bigdata/api/v1/services/',data).respond(201,dummyPostMsg);
    var status;
    var msg = {};
    service.create(data).then(function(response){
      status = response.status;
      msg = response.data;
    });
    mockBackend.flush();
    expect(status).toEqual(201);
    expect(msg).toEqual(dummyPostMsg) 
  });

  it('should delete a given cluster', function() {

    mockBackend.expectDELETE('/bigdata/api/v1/services/?type=multi&name=slurm&id=1').respond(dummyDeleteMsg);
    var msg = {};
    service.remove('multi','slurm','1').then(function(response){
      msg = response.data;
    });
    mockBackend.flush();
    expect(msg).toEqual(dummyDeleteMsg); 
  });

  afterEach(function() {
    // Ensure that all expects on the $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server responded
    mockBackend.verifyNoOutstandingRequest();
  });

});

