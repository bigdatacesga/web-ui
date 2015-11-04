'use strict';

describe('hadoopApp.iprule module', function() {

  // Given
  beforeEach(module('hadoopApp.iprule.iprule-directive'));

  var compile, mockBackend, rootScope;

  beforeEach(inject(function($compile, $httpBackend, $rootScope) {
    compile = $compile;
    mockBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  var testRule;
  beforeEach(function() {
    testRule = {
        iprule:"192.168.1.0/24"
      };

    mockBackend.expectGET('components/iprule/iprule.html').respond(
      '<div ng-bind="ipruleData.iprule"></div>');
  });

  it('should render HTML based on scope correctly', function() {
    var scope = rootScope.$new();
    scope.ipruleData = testRule;

    // When
    var element = compile('<iprule' +
      ' iprule-data="ipruleData" />')(scope);
    scope.$digest();
    mockBackend.flush();


    var bindings = element.find('div'); 
    expect(bindings.length).toBe(1);
    expect(bindings.eq(0).text()).toBe('192.168.1.0/24');

  });

 
  afterEach(function() {
    // Ensure that all expects on the $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server responded
    mockBackend.verifyNoOutstandingRequest();
  });
});
 
