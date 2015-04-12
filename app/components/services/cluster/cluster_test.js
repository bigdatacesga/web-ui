'use strict';

describe('hadoopApp.service.cluster', function() {

  beforeEach(module('hadoopApp.service.cluster'));

  var service, mockBackend;

  beforeEach(inject(function(ClusterService, $httpBackend) {
    service = ClusterService;
    mockBackend = $httpBackend;
  }));

  var dummyClusters;
  beforeEach(function() {
    dummyClusters = [
      {
        id:"189",
        user:"uscfajlc",
        group:"hadoop",
        name:"hadoop-189",
        vms:[
          {
            vmid:"42077",
            status:"runn",
            ucpu:2,
            umem:"2G",
            host:"nubacesga-10-1",
            time:"0d00h06",
            name:"hadoop-189-0",
            ip:"193.144.33.100"
          },
          {
            vmid:"42078",
            status:"runn",
            ucpu:1,
            umem:"1024M",
            host:"nubacesga-05-2",
            time:"0d00h06",
            name:"hadoop-189-1",
            ip:"10.38.1.2"
          }
        ],
        exitStatus:0
      },
      {
        id:"190",
        user:"uscfajlc",
        group:"hadoop",
        name:"hadoop-190",
        vms:[
          {
            vmid:"42079",
            status:"runn",
            ucpu:2,
            umem:"2G",
            host:"nubacesga-10-1",
            time:"0d00h06",
            name:"hadoop-189-0",
            ip:"193.144.33.100"
          },
          {
            vmid:"42080",
            status:"runn",
            ucpu:1,
            umem:"1024M",
            host:"nubacesga-05-2",
            time:"0d00h06",
            name:"hadoop-189-1",
            ip:"10.38.1.2"
          }
        ],
        exitStatus:0
      }
    ];
  });

  it('should return the list of active clusters', function() {
    mockBackend.expectGET('/hadoop/v1/clusters').respond(dummyClusters);
    var clusters = [];
    service.list().then(function(response){
      clusters = response.data;
    });
    mockBackend.flush();
    expect(clusters).toEqual(dummyClusters); 
  });

  it('should show info about a given cluster', function() {
    mockBackend.expectGET('/hadoop/v1/clusters/101').respond(dummyClusters[0]);
    var cluster = [];
    service.show('101').then(function(response){
      cluster = response.data;
    });
    mockBackend.flush();
    expect(cluster).toEqual(dummyClusters[0]); 
  });

  it('should delete a given cluster', function() {
    var dummyMsg = {"message":"Hadoop cluster with id [101]: DELETED SUCCESSFULLY"};
    mockBackend.expectDELETE('/hadoop/v1/clusters/101').respond(dummyMsg);
    var msg = {};
    service.delete('101').then(function(response){
      msg = response.data;
    });
    mockBackend.flush();
    expect(msg).toEqual(dummyMsg); 
  });

  it('should create a new cluster', function() {
    var dummyMsg = {"message":"id:101"};
    var options = { 
      size: 10,
      dfsReplicas: 3,
      dfsBlockSize: 64,
      reduceTasksNumber: 1, 
    };
    mockBackend.expectPOST('/hadoop/v1/clusters', options).respond(dummyMsg);
    var msg = {};
    service.create(10, 3, 64, 1).then(function(response){
      msg = response.data;
    });
    mockBackend.flush();
    expect(msg).toEqual(dummyMsg); 
  });

  afterEach(function() {
    // Ensure that all expects on the $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server responded
    mockBackend.verifyNoOutstandingRequest();
  });

});

