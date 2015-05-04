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
      var dummyToken = { token: '==DUMMYTOKEN==', expires: 1430762101965 };
      mockBackend.expectPOST('/api/authenticate', 
                            'username=test&password=testpass',
                            function (headers) {
                              return headers['Content-Type'] === "application/x-www-form-urlencoded";
                            })
        .respond(dummyToken);
      ctrl.user = {username: "test", password: "testpass"};
      ctrl.login();
      mockBackend.flush();
      expect($state.go).toHaveBeenCalledWith('dashboard');
      expect(window.sessionStorage.token).toEqual(dummyToken.token);
      expect(parseInt(window.sessionStorage.expires)).toEqual(dummyToken.expires);
    }));

    it('should fail login with wrong credentials', inject(function($controller, $state) {
      var ctrl = $controller('LoginCtrl');
      mockBackend.expectPOST('/api/authenticate', 
                             'username=test&password=wrongpass').respond(401, '');
      ctrl.user = {username: "test", password: "wrongpass"};
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
