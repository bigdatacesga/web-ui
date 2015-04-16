'use strict';

describe('hadoopApp.sshkeys module', function() {

  beforeEach(module('hadoopApp.sshkeys'));

  beforeEach(inject(function($state) {
    spyOn($state, 'go');
  }));

  describe('sshkeys controller', function(){

    it('should load', inject(function($controller) {
      var ctrl = $controller('SSHKeysCtrl');
      expect(ctrl).toBeDefined();
    }));

    it('should have 4 sample sshkeys', inject(function($controller) {
      var ctrl = $controller('SSHKeysCtrl');
      expect(ctrl.sshKeys.length).toBe(4);
    }));


  });
});
 
