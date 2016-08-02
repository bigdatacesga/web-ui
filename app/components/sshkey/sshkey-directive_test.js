'use strict';

describe('bigdata.sshkey module', function() {

  // Given
  beforeEach(module('bigdata.sshkey.sshkey-directive'));

  var compile, mockBackend, rootScope;

  beforeEach(inject(function($compile, $httpBackend, $rootScope) {
    compile = $compile;
    mockBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  var testKey;
  beforeEach(function() {
    testKey = {key:"ssh-dss AAAAB3NzaC1kc3MAAACBAKfmTAYNrwWKJBmnSl0lN8nNVAb6n7i7Ctj7SCg2e8+Je/Y8mvC494nAwH8UZqCStF5UW8XXMiEt9ax5VXjHLAtqlhdCtRaXDctJiCyVgSUWZRI8AQq+d8bVZ+8jG2vQV0c3Tp/jAE177fpskkVTiBF92r1o/5q3Br6Gy0cRBA4BAAAAFQC4n2JCi75HN30Hca5nnE0Dm6oOKwAAAIB6+PCcBNy+hg9BBrSHUnnPmdQj12k5QSo1GOH3yw2430x0oYIaQjTR3KF5ViPRX1IOq5Z/LlHRkQQclP8Zde8dGLKNNEJBd8w3RYMhqfvxBZWSjAfJKCf1AytjVaTWnEiVVKE2Qv3oXArTYKmf5ly0AtON5BiEJZA/hh7NPqc3zwAAAIBDDTi1bebjDcU3GM+qPZvEX6eZX0JPNElZd5PlGaSctfSwhxIzUYH4MsgLCtyOmG6Bc6KR7aV0wGQREupCnr+E8R3lYeeT4jMmDXp/WK4Raxwpth4p+imw8bondUEgUs+aGR4d2s7fWGuzHo1fd7noHGlTNl0okd5mJG88sXs9hA=="};

    mockBackend.expectGET('components/sshkey/sshkey.html').respond(
      '<div ng-bind="sshkeyData.key"></div>');
  });

  it('should render HTML based on scope correctly', function() {
    var scope = rootScope.$new();
    scope.sshkeyData = testKey;

    // When
    var element = compile('<sshkey' +
      ' sshkey-data="sshkeyData" />')(scope);
    scope.$digest();
    mockBackend.flush();


    var bindings = element.find('div'); 
    expect(bindings.length).toBe(1);
    expect(bindings.eq(0).text()).toBe('ssh-dss AAAAB3NzaC1kc3MAAACBAKfmTAYNrwWKJBmnSl0lN8nNVAb6n7i7Ctj7SCg2e8+Je/Y8mvC494nAwH8UZqCStF5UW8XXMiEt9ax5VXjHLAtqlhdCtRaXDctJiCyVgSUWZRI8AQq+d8bVZ+8jG2vQV0c3Tp/jAE177fpskkVTiBF92r1o/5q3Br6Gy0cRBA4BAAAAFQC4n2JCi75HN30Hca5nnE0Dm6oOKwAAAIB6+PCcBNy+hg9BBrSHUnnPmdQj12k5QSo1GOH3yw2430x0oYIaQjTR3KF5ViPRX1IOq5Z/LlHRkQQclP8Zde8dGLKNNEJBd8w3RYMhqfvxBZWSjAfJKCf1AytjVaTWnEiVVKE2Qv3oXArTYKmf5ly0AtON5BiEJZA/hh7NPqc3zwAAAIBDDTi1bebjDcU3GM+qPZvEX6eZX0JPNElZd5PlGaSctfSwhxIzUYH4MsgLCtyOmG6Bc6KR7aV0wGQREupCnr+E8R3lYeeT4jMmDXp/WK4Raxwpth4p+imw8bondUEgUs+aGR4d2s7fWGuzHo1fd7noHGlTNl0okd5mJG88sXs9hA==');

  });

 
  afterEach(function() {
    // Ensure that all expects on the $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server responded
    mockBackend.verifyNoOutstandingRequest();
  });
});
 
