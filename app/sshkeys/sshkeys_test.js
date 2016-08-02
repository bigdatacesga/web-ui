'use strict';

describe('bigdata.sshkeys module', function() {

  beforeEach(module('bigdata.sshkeys'));

  beforeEach(inject(function($state) {
    spyOn($state, 'go');
    
  }));

  it('should load', inject(function($controller) {
    var ctrl = $controller('SSHKeysCtrl');
    expect(ctrl).toBeDefined();
  }));

});
 
