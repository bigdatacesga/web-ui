'use strict';

describe('cesgaBDApp.sshkeys module', function() {

  beforeEach(module('cesgaBDApp.sshkeys'));

  beforeEach(inject(function($state) {
    spyOn($state, 'go');
    
  }));

  it('should load', inject(function($controller) {
    var ctrl = $controller('SSHKeysCtrl');
    expect(ctrl).toBeDefined();
  }));

});
 
