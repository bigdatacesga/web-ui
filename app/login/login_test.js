'use strict';

describe('hadoopApp.login module', function() {

  beforeEach(module('hadoopApp.login'));

  beforeEach(inject(function($state) {
    spyOn($state, 'go');
  }));

  var mockBackend, window;

  beforeEach(inject(function($httpBackend, $window) {
    mockBackend = $httpBackend;
    window = $window;
  }));

  describe('login controller', function(){

    it('should load', inject(function($controller) {
      var ctrl = $controller('LoginCtrl');
      expect(ctrl).toBeDefined();
    }));

    it('should login with right credentials', inject(function($controller, $state) {
      var ctrl = $controller('LoginCtrl');
      var dummyToken = "--DUMMYTOKEN--";
      mockBackend.expectPOST('/authenticate', {user: "test", password: "testpass"}).respond({ token: dummyToken });
      ctrl.user = {user: "test", password: "testpass"};
      ctrl.login();
      mockBackend.flush();
      expect($state.go).toHaveBeenCalledWith('dashboard');
      expect(window.sessionStorage.token).toEqual(dummyToken);
    }));

    it('should fail login with wrong credentials', inject(function($controller, $state) {
      var ctrl = $controller('LoginCtrl');
      var dummyToken = "--DUMMYTOKEN--";
      mockBackend.expectPOST('/authenticate', {user: "test", password: "wrongpass"}).respond(500, '');
      ctrl.user = {user: "test", password: "wrongpass"};
      ctrl.login();
      mockBackend.flush();
      expect(window.sessionStorage.token).toEqual(undefined);
      expect($state.go.callCount).toBe(0);
    
    }));
  });

  afterEach(function() {
    // Ensure that all expects on the $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server responded
    mockBackend.verifyNoOutstandingRequest();
  });
});
