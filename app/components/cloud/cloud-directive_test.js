'use strict';

describe('bigdata cloud directive', function() {

  // Given
  beforeEach(module('bigdata.components.cloud'));

  var compile, mockBackend, rootScope;

  beforeEach(inject(function($compile, $httpBackend, $rootScope) {
    compile = $compile;
    mockBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  var dummyCluster;
  var dummyNodes;
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
    mockBackend.expectGET('components/cloud/cloud.html').respond(
      '<div>' +
      '<div ng-bind="cloudData.name"></div>' +
      '<div ng-bind="cloudData.vms[0].vmid"></div>' +
      '</div>');
  });

  it('should render HTML based on scope correctly', function() {
    var scope = rootScope.$new();
    scope.cloudData = dummyCluster;

    // When
    var element = compile('<cloud cloud-data="cloudData" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    /* Firefox and Chrome place the class and ng-bind attributes in different order
     * so the below test always fails in one of them
    expect(element.html()).toEqual(
      '<div class="ng-binding" ng-bind="cloudData.name">' +
        'hadoop-189' +
      '</div>' +
      '<div class="ng-binding" ng-bind="cloudData.vms[0].vmid">' +
         '42077' +
      '</div>');
    */

    var bindings = element.find('div'); 
    expect(bindings.length).toBe(2);
    expect(bindings.eq(0).text()).toBe('hadoop-189');
    //expect(bindings.eq(1).text()).toBe('42077');

  });

  it('should load correct cluster data', function() {
    var scope = rootScope.$new();
    scope.cloudData = dummyCluster;

    // When
    var element = compile('<cloud cloud-data="cloudData" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.cloudData).toEqual(scope.cloudData);
  });

  it('should load show-details option: true', function() {
    var scope = rootScope.$new();
    scope.cloudData = dummyCluster;

    // When
    var element = compile('<cloud cloud-data="cloudData" show-details="true" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual('true');
  });

  it('should load show-details option: false', function() {
    var scope = rootScope.$new();
    scope.cloudData = dummyCluster;

    // When
    var element = compile('<cloud cloud-data="cloudData" show-details="false" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual('false');
  });

  it('should toggle cluster details info', function() {
    var scope = rootScope.$new();
    scope.cloudData = dummyCluster;

    // When
    var element = compile('<cloud cloud-data="cloudData" show-details="false" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual('false');

    mockBackend.whenGET("/api/nodes/cluster/189").respond({test:""});
    mockBackend.expectGET("/api/nodes/cluster/189");
    // When
    compiledElementScope.toggleDetails();
    mockBackend.flush();
    
    // Then
    expect(compiledElementScope.showDetails).toEqual('true');
  });

  it('should collapse if show-details is false', function() {
    var scope = rootScope.$new();
    scope.cloudData = dummyCluster;

    // When
    var element = compile('<cloud cloud-data="cloudData" show-details="false" />')(scope);
    scope.$digest();
    mockBackend.flush();

    // Then
    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.showDetails).toEqual('false');
    expect(compiledElementScope.isCollapsed()).toEqual(true);
  });

  it('should expand if show-details is true', function() {
    var scope = rootScope.$new();
    scope.cloudData = dummyCluster;

    // When
    var element = compile('<cloud cloud-data="cloudData" show-details="true" />')(scope);
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
