'use strict';

describe('cesgaBDApp.bigdataInstance module', function() {

  // Given
  beforeEach(module('cesgaBDApp.bigdataInstance.bigdataInstance-directive'));

  var compile, mockBackend, rootScope;

  beforeEach(inject(function($compile, $httpBackend, $rootScope) {
    compile = $compile;
    mockBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  var dummyService;
  beforeEach(function() {
     dummyService = 
      {
        "clustername": "MyMPIcluster", 
        "cpu": 4, 
        "masterIP": "10.112.13.110", 
        "mem": 2048, 
        "num_nodes": 2, 
        "service_full_name": "MPI-jenes-1", 
        "instance_id": 1, 
        "service_name": "MPI", 
        "service_type": "multi", 
        "service_username": "jenes"
    };
    mockBackend.expectGET('components/bigdataInstance/bigdataInstance.html').respond(
      '<div>' +
      '<div ng-bind="bigdataInstanceData.name"></div>' +
      '<div ng-bind="bigdataInstanceData.vms[0].vmid"></div>' +
      '</div>');
  });

  it('should render HTML based on scope correctly', function() {
    var scope = rootScope.$new();
    scope.bigdataInstanceData = dummyService;

    // When
    var element = compile('<bigdataInstance bigdataInstance-data="bigdataInstanceData" />')(scope);
    scope.$digest();
    mockBackend.flush();
  });

  it('should load correct cluster data', function() {
    var scope = rootScope.$new();
    scope.bigdataInstanceData = dummyService;

    // When
    var element = compile('<bigdataInstance bigdataInstance-data="bigdataInstanceData" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.bigdataInstanceData).toEqual(scope.bigdataInstanceData);
  });

  it('should load show-details option: true', function() {
    var scope = rootScope.$new();
    scope.bigdataInstanceData = dummyService;

    // When
    var element = compile('<bigdataInstance bigdataInstance-data="bigdataInstanceData" show-details="true" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual('true');
  });

  it('should load show-details option: false', function() {
    var scope = rootScope.$new();
    scope.bigdataInstanceData = dummyService;

    // When
    var element = compile('<bigdataInstance bigdataInstance-data="bigdataInstanceData" show-details="false" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual('false');
  });

  it('should toggle cluster details info', function() {
    var scope = rootScope.$new();
    scope.bigdataInstanceData = dummyService;

    // When
    var element = compile('<bigdataInstance bigdataInstance-data="bigdataInstanceData" show-details="false" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual('false');

    mockBackend.whenGET("/bigdata/api/v1/services/nodes/?type=multi&name=MPI&id=1").respond({test:""});
    mockBackend.expectGET("/bigdata/api/v1/services/nodes/?type=multi&name=MPI&id=1");
    // When
    compiledElementScope.toggleDetails();
    mockBackend.flush();
    
    // Then
    expect(compiledElementScope.showDetails).toEqual('true');
  });

  it('should collapse if show-details is false', function() {
    var scope = rootScope.$new();
    scope.bigdataInstanceData = dummyService;

    // When
    var element = compile('<bigdataInstance bigdataInstance-data="bigdataInstanceData" show-details="false" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual('false');
    expect(compiledElementScope.isCollapsed()).toEqual(true);
  });

  it('should expand if show-details is true', function() {
    var scope = rootScope.$new();
    scope.bigdataInstanceData = dummyService;

    // When
    var element = compile('<bigdataInstance bigdataInstance-data="bigdataInstanceData" show-details="true" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual('true');
    expect(compiledElementScope.isCollapsed()).toEqual(false);
  });

  afterEach(function() {
    // Ensure that all expects on the $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server responded
    mockBackend.verifyNoOutstandingRequest();
  });
});
