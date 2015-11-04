'use strict';

describe('hadoopApp.service.keys', function() {

  beforeEach(module('hadoopApp.service.keys'));

  var service, mockBackend;

  beforeEach(inject(function(KeyService, $httpBackend) {
    service = KeyService;
    mockBackend = $httpBackend;
  }));

  var dummykeys;
  beforeEach(function() {
    dummykeys = [
      {
        "id": 1,
        "pubkey": "ssh-dss AAAAB3NzaC1kc3MAAACBANiFmbpFwsrN8mjsVBS+skLigLCzgAWfKG362/GbNkF+O6L1dL50YVAhQ4vp+U9Hw/zsFfgd3XzVl5wPHF9mvtkpn/6EXbUaezFlVcAbISWu3CH7Y1B6l0llGgEe7YoBHZemPjk4F56mZlYLG9c8yzrpWmpm2imAfe4bwY1aF/eFAAAAFQDGaY98j+FNOHYn4m6MBzDlKAvHcQAAAIBDznKUpNwbv29OXJNBqZMpBdHcaUjpTiMjDY4AFzzeoEFuuHXa9OX+3Yb7H6axTX3Zksapaou9iLTqEd24+GKV3E3dpvI/22SuXOLOZ+QAg+Wa6mndYlfn9y49qB+SjAU2USxvtAtoGVeYPiNFVivwtRa72wPdZprgY68B4i3H8AAAAIEAtLczTpX4ko29cwEZ1llpz9Fdt//1Sh9xDarocLMVGklqqlhFSGOlL6ypmdwYUdrY22UiBPVT6XTyi77VsakS40xXSHm+JBMfoxpSHrKIFxna6hPUTtoXKKlewa4GqBTgRJpGzhXF4cu5mM1zr2+Ov2IXeZzPbaw99Y//zR0PH0E= jlc@max2",
        "enabled": true
      },
      {
        "id": 2,
        "pubkey": "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAqZqncbWjqhAtYUon0+K0+wdBxyHBq3ewoD+OJw2bddoILj7/LH4WxZu9W3Haug0Tv3NFndMKOo4k3zYd0Q0oQbcK2jXg/OKzB7M4zyNC/3q1mNpfhOFTe75NMiX7VotjgH/I8ETNun6sPe/YhmHmfbuel6cTozgbuCbb6a14wAk= jlc@lxplus",
        "enabled": true
      }
    ];
  });

  it('should return the list of active keys', function() {
    mockBackend.expectGET('/api/sshKeys').respond(dummykeys);
    var keys = [];
    service.getAll().then(function(response){
      keys = response.data;
    });
    mockBackend.flush();
    expect(keys).toEqual(dummykeys); 
  });

  it('should show the info about a given key', function() {
    mockBackend.expectGET('/api/sshKeys/1').respond(dummykeys[0]);
    var key;
    service.get('1').then(function(response){
      key = response.data;
    });
    mockBackend.flush();
    expect(key).toEqual(dummykeys[0]); 
  });

  it('should delete a given key', function() {
    mockBackend.expectDELETE('/api/sshKeys/1').respond(200, '');
    var status = 0;
    service.remove('1').then(function(response){
      status = response.status;
    });
    mockBackend.flush();
    expect(status).toEqual(200); 
  });

  it('should add a new key', function() {
    var data = { 
        pubkey: "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAqZqncbWjqhAtYUon0+K0+wdBxyHBq3ewoD+OJw2bddoILj7/LH4WxZu9W3Haug0Tv3NFndMKOo4k3zYd0Q0oQbcK2jXg/OKzB7M4zyNC/3q1mNpfhOFTe75NMiX7VotjgH/I8ETNun6sPe/YhmHmfbuel6cTozgbuCbb6a14wAk= jlc@lxplus",
        enabled: true
    };
    mockBackend.expectPOST('/api/sshKeys', data).respond(201, '');
    var status;
    service.create(data).then(function(response){
      status = response.status;
    });
    mockBackend.flush();
    expect(status).toEqual(201); 
  });

  it('should update an key', function() {
    var key = { 
        id: 1,
        pubkey: "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAqZqncbWjqhAtYUon0+K0+wdBxyHBq3ewoD+OJw2bddoILj7/LH4WxZu9W3Haug0Tv3NFndMKOo4k3zYd0Q0oQbcK2jXg/OKzB7M4zyNC/3q1mNpfhOFTe75NMiX7VotjgH/I8ETNun6sPe/YhmHmfbuel6cTozgbuCbb6a14wAk= jlc@lxplus",
        enabled: false
    };
    mockBackend.expectPUT('/api/sshKeys/1', key).respond(200, '');
    var status;
    service.update(key).then(function(response){
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

