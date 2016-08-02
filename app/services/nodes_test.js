'use strict';

describe('bigdata.components.endpoints.nodes', function() {

  beforeEach(module('bigdata.components.endpoints.bigdata.nodes'));
  beforeEach(module('bigdata.components.endpoints.cloud.nodes'));

  var serviceMulti, serviceCloud, mockBackend;

  beforeEach(inject(function(NodesServiceMulti, NodesServiceCloud, $httpBackend) {
    serviceMulti = NodesServiceMulti;
    serviceCloud = NodesServiceCloud;
    mockBackend = $httpBackend;
  }));

  var dummyNodesMulti;
  var dummyNodesCloud;

  beforeEach(function() {
      dummyNodesMulti = 
      {
      "nodes": [
        {
          "node_cpu": 2, 
          "node_mem": 1024, 
          "nodeIP": "10.112.13.110", 
          "node_id": 0
        }, 
        {
          "node_cpu": 2, 
          "node_mem": 1024, 
          "nodeIP": "10.112.13.111", 
          "node_id": 1
        }
      ]
    };
    dummyNodesCloud = 
      {
      "nodes" : [
        {
          "name":"hadoop-384-0",
          "ip":"193.144.33.105",
          "status":"PROLOG",
          "username":"jenes",
          "startTime":"2016-04-14T14:32:11Z",
          "endTime":"1970-01-01T00:00:00Z",
          "ucpu":0,
          "umem":0,
          "host":"nubacesga-05-2",
          "uptimeSeconds":43,
          "clusterId":1,
          "nodeInSystemId":0,
          "id":null
        },{
          "name":"hadoop-384-1",
          "ip":"10.38.1.11",
          "status":"PROLOG",
          "username":"jenes",
          "startTime":"2016-04-14T14:32:12Z",
          "endTime":"1970-01-01T00:00:00Z",
          "ucpu":0,
          "umem":0,
          "host":"nubacesga-10-3",
          "uptimeSeconds":42,
          "clusterId":1,
          "nodeInSystemId":1,
          "id":null
        },{
          "name":"hadoop-384-2",
          "ip":"10.38.1.12",
          "status":"PROLOG",
          "username":"jenes",
          "startTime":"2016-04-14T14:32:13Z",
          "endTime":"1970-01-01T00:00:00Z",
          "ucpu":0,
          "umem":0,
          "host":"nubacesga-08-2",
          "uptimeSeconds":41,
          "clusterId":1,
          "nodeInSystemId":2,
          "id":null
        }
      ]
      };
  });


  it('should return the list of nodes of a multi service', function() {
    mockBackend.expectGET('/bigdata/api/v1/services/nodes/?type=multi&name=slurm&id=11').respond(dummyNodesMulti);
    var services = [];
    serviceMulti.listClusterNodes("multi","slurm","11").then(function(response){
      services = response.data;
    });
    mockBackend.flush();
    expect(services).toEqual(dummyNodesMulti); 
  });

  it('should return the list of nodes of a cloud service', function() {
    mockBackend.expectGET('/api/nodes/cluster/12').respond(dummyNodesCloud);
    var services = [];
    serviceCloud.listClusterNodes("12").then(function(response){
      services = response.data;
    });
    mockBackend.flush();
    expect(services).toEqual(dummyNodesCloud); 
  });

  afterEach(function() {
    // Ensure that all expects on the $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server responded
    mockBackend.verifyNoOutstandingRequest();
  });

});

