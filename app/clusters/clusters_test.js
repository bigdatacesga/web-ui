'use strict';

describe('hadoopApp.clusters controller', function() {

  beforeEach(module('hadoopApp.clusters'));

  var ctrl, mockService, dummyClusters, state;

  // beforeEach(function() {
  //   dummyClusters = [
  //     {
  //       id:"189",
  //       user:"uscfajlc",
  //       group:"hadoop",
  //       name:"hadoop-189",
  //       vms:[
  //         {
  //           vmid:"42077",
  //           status:"runn",
  //           ucpu:2,
  //           umem:"2G",
  //           host:"nubacesga-10-1",
  //           time:"0d00h06",
  //           name:"hadoop-189-0",
  //           ip:"193.144.33.100"
  //         },
  //         {
  //           vmid:"42078",
  //           status:"runn",
  //           ucpu:1,
  //           umem:"1024M",
  //           host:"nubacesga-05-2",
  //           time:"0d00h06",
  //           name:"hadoop-189-1",
  //           ip:"10.38.1.2"
  //         }
  //       ],
  //       exitStatus:0
  //     },
  //     {
  //       id:"190",
  //       user:"uscfajlc",
  //       group:"hadoop",
  //       name:"hadoop-190",
  //       vms:[
  //         {
  //           vmid:"42079",
  //           status:"runn",
  //           ucpu:2,
  //           umem:"2G",
  //           host:"nubacesga-10-1",
  //           time:"0d00h06",
  //           name:"hadoop-189-0",
  //           ip:"193.144.33.100"
  //         },
  //         {
  //           vmid:"42080",
  //           status:"runn",
  //           ucpu:1,
  //           umem:"1024M",
  //           host:"nubacesga-05-2",
  //           time:"0d00h06",
  //           name:"hadoop-189-1",
  //           ip:"10.38.1.2"
  //         }
  //       ],
  //       exitStatus:0
  //     }
  //   ];
  // });

  /* http://stackoverflow.com/questions/23705051/how-do-i-mock-a-service-that-returns-promise-in-angularjs-jasmine-unit-test
  beforeEach(module(function($provide) {
    mockService = {
      list: function() {
        return $q.when(dummyClusters);
      }
    };
  
    $provide.value('ClusterService', mockService);
  }));
  */

  // beforeEach(inject(function(ClusterService, $q) {
  //   spyOn(ClusterService, "list").andReturn($q.when(dummyClusters));
  //   //spyOn(ClusterService, "list").andCallFake(function() {
  //   //  var deferred = $q.defer();
  //   //  deferred.resolve(dummyClusters);
  //   //  //deferred.reject('Simulated error');
  //   //  return deferred.promise;
  //   //});
  // }));

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

  // it('should have sample clusters', inject(function($rootScope) {
  //   $rootScope.$apply();
  //   ctrl.activate();
  //   expect(ctrl.clusters.length).toBe(2);
  // }));

  // it('should launch the new cluster wizard', function() {
  //   //expect($state.is('clusters')).toBe(true);
  //   ctrl.launchClusterWizard();
  //   expect(state.go).toHaveBeenCalledWith('launcher');
  // });

});


