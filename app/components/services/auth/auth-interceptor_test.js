'use strict';

describe('hadoopApp.services.auth.auth-interceptor', function() {

  beforeEach(module('hadoopApp.services.auth.auth-interceptor'));

  var interceptor, mockBackend, window;

  beforeEach(inject(function(authInterceptor, $httpBackend, $window) {
    interceptor = authInterceptor;
    mockBackend = $httpBackend;
    window = $window;
  }));

  it('should load', inject(function() {
    expect(interceptor).toBeDefined();
  }));

  it('should add token to headers when token available', inject(function() {
    var config = {};
    var dummyToken = "_TESTTOKEN_";
    window.sessionStorage.token = dummyToken;
    interceptor.request(config);
    expect(config.headers.Authorization).toBe('x-auth-token ' + dummyToken);
  }));

  it('should not add token to headers if token is empty', inject(function() {
    var config = {};
    config.headers = {};
    window.sessionStorage.token = '';
    interceptor.request(config);
    expect(config.headers.Authorization).toBe(undefined);
  }));

  it('should not add token to headers if no token is available', inject(function() {
    var config = {};
    config.headers = {};
    interceptor.request(config);
    expect(config.headers.Authorization).toBe(undefined);
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
  });
});
