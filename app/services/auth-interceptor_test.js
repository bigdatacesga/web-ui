'use strict';

describe('bigdata.services.auth.auth-interceptor', function() {

  beforeEach(module('bigdata.services.auth.auth-interceptor'));

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
    var dummyToken = "==TESTTOKEN==";
    window.sessionStorage.token = dummyToken;
    window.sessionStorage.expires = new Date().getTime() + 3600;
    interceptor.request(config);
    expect(config.headers['x-auth-token']).toBe(dummyToken);
  }));

  it('should not add token to headers if token is empty', inject(function() {
    var config = {};
    config.headers = {};
    window.sessionStorage.token = '';
    interceptor.request(config);
    expect(config.headers['x-auth-token']).toBe(undefined);
  }));

  it('should not add token to headers if no token is available', inject(function() {
    var config = {};
    config.headers = {};
    interceptor.request(config);
    expect(config.headers['x-auth-token']).toBe(undefined);
  }));

  it('should not add token to headers if it has expired', inject(function() {
    var config = {};
    var dummyToken = "==TESTTOKEN==";
    window.sessionStorage.token = dummyToken;
    window.sessionStorage.expires = new Date().getTime() - 1;
    interceptor.request(config);
    expect(config.headers['x-auth-token']).toBe(undefined);
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
  });
});
