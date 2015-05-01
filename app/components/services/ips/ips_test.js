'use strict';

describe('hadoopApp.service.ips', function() {

  beforeEach(module('hadoopApp.service.ips'));

  var service, mockBackend;

  beforeEach(inject(function(IpService, $httpBackend) {
    service = IpService;
    mockBackend = $httpBackend;
  }));

  var dummyIps;
  beforeEach(function() {
    dummyIps = [
      {
        "id": 1,
        "address": "10.112.0.1",
        "enabled": true
      },
      {
        "id": 2,
        "address": "193.144.34.0/24",
        "enabled": true
      }
    ];
  });

  it('should return the list of active ips', function() {
    mockBackend.expectGET('/hadoop/v1/ip?user=fajlc').respond(dummyIps);
    var ips = [];
    service.getAll().then(function (response){
      ips = response.data;
    });
    mockBackend.flush();
    expect(ips).toEqual(dummyIps); 
  });

  it('should show the info about a given ip', function() {
    mockBackend.expectGET('/hadoop/v1/ips/1').respond(dummyIps[0]);
    var cluster = [];
    service.get('1').then(function(response){
      cluster = response.data;
    });
    mockBackend.flush();
    expect(cluster).toEqual(dummyIps[0]); 
  });

  it('should delete a given ip', function() {
    mockBackend.expectDELETE('/hadoop/v1/ip/1').respond(200, '');
    var status = 0;

    service.remove('1').then(function(response){
      status = response.status;
    });
    mockBackend.flush();
    expect(status).toEqual(200); 
  });

  it('should add a new IP', function() {
    var dummyMsg = {"message":"id:1"};
    var data = { 
        address: "193.144.34.10",
        enabled: true
    };
    mockBackend.expectPOST('/hadoop/v1/ip', data).respond(201, '');
    var status;
    service.create("193.144.34.10").then(function(response){
      status = response.status;
    });
    mockBackend.flush();
    expect(status).toEqual(201); 
  });

  it('should update an IP', function() {
    var ip = { 
        id: 1,
        address: "193.144.34.10",
        enabled: false
    };
    mockBackend.expectPUT('/hadoop/v1/ip', ip).respond(200, '');
    var status;
    service.update(ip).then(function(response){
      status = response.status;
    });
    mockBackend.flush();
    expect(status).toEqual(200); 
  });

  afterEach(function() {
    // Ensure that all expects on the $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server responded
    mockBackend.verifyNoOutstandingRequest();
  });

});

