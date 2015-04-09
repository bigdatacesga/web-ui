'use strict';

describe('hadoopApp.cluster module', function() {

  // Given
  beforeEach(module('hadoopApp.cluster.cluster-directive'));

  var compile, mockBackend, rootScope;

  beforeEach(inject(function($compile, $httpBackend, $rootScope) {
    compile = $compile;
    mockBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  var dummyCluster;
  beforeEach(function() {
    dummyCluster = {
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
    };

    mockBackend.expectGET('components/cluster/cluster.html').respond(
      '<div>' +
      '<div ng-bind="clusterData.name"></div>' +
      '<div ng-bind="clusterData.vms[0].vmid"></div>' +
      '</div>');
  });

  it('should render HTML based on scope correctly', function() {
    var scope = rootScope.$new();
    scope.clusterData = dummyCluster;

    // When
    var element = compile('<cluster' +
      ' cluster-data="clusterData" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    expect(element.html()).toEqual(
      '<div ng-bind="clusterData.name" class="ng-binding">' +
        'hadoop-189' +
      '</div>' +
      '<div ng-bind="clusterData.vms[0].vmid" class="ng-binding">' +
         '42077' +
      '</div>');
  });

  it('should load correct cluster data', function() {
    var scope = rootScope.$new();
    scope.clusterData = dummyCluster;

    // When
    var element = compile('<cluster' +
      ' cluster-data="clusterData" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.clusterData).toEqual(scope.clusterData);
  });

  it('should load show-details option: true', function() {
    var scope = rootScope.$new();
    scope.clusterData = dummyCluster;

    // When
    var element = compile('<cluster' +
      ' cluster-data="clusterData" show-details="true" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual(true);
  });

  it('should load show-details option: false', function() {
    var scope = rootScope.$new();
    scope.clusterData = dummyCluster;

    // When
    var element = compile('<cluster' +
      ' cluster-data="clusterData" show-details="false" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual(false);
  });

  /*
  // Disabled: using default options with compile is too messy
  it('should not show details by default', function() {
    var scope = rootScope.$new();
    scope.clusterData = dummyCluster;

    // When
    var element = compile('<cluster' +
      ' cluster-data="clusterData" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual(false);
  });
  */

  it('should toggle cluster details info', function() {
    var scope = rootScope.$new();
    scope.clusterData = dummyCluster;
    scope.showDetails = false;

    // When
    var element = compile('<cluster' +
      ' cluster-data="clusterData" show-details="showDetails" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    console.log(compiledElementScope.showDetails);
    expect(compiledElementScope.showDetails).toEqual(false);

    // When
    compiledElementScope.toggleDetails();

    // Then
    expect(compiledElementScope.showDetails).toEqual(true);
  });

  afterEach(function() {
    // Ensure that all expects on the $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server responded
    mockBackend.verifyNoOutstandingRequest();
  });
});
