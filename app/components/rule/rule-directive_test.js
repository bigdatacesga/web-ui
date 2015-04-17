'use strict';

describe('hadoopApp.rule module', function() {

  // Given
  beforeEach(module('hadoopApp.rule.rule-directive'));

  var compile, mockBackend, rootScope;

  beforeEach(inject(function($compile, $httpBackend, $rootScope) {
    compile = $compile;
    mockBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  var testRule;
  beforeEach(function() {
    testRule = {rule:"-A INPUT -s 192.168.1.0/24 -p tcp -m tcp --dport 22 -j ACCEPT"};

    mockBackend.expectGET('components/rule/rule.html').respond(
      '<div ng-bind="ruleData.rule"></div>');
  });

  it('should render HTML based on scope correctly', function() {
    var scope = rootScope.$new();
    scope.ruleData = testRule;

    // When
    var element = compile('<rule' +
      ' rule-data="ruleData" />')(scope);
    scope.$digest();
    mockBackend.flush();


    var bindings = element.find('div'); 
    expect(bindings.length).toBe(1);
    expect(bindings.eq(0).text()).toBe('-A INPUT -s 192.168.1.0/24 -p tcp -m tcp --dport 22 -j ACCEPT');

  });

 
  afterEach(function() {
    // Ensure that all expects on the $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server responded
    mockBackend.verifyNoOutstandingRequest();
  });
});
 
