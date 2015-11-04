'use strict';

describe('hadoopApp.sshkeys module', function() {

  beforeEach(module('hadoopApp.sshkeys'));

  beforeEach(inject(function($state) {
    spyOn($state, 'go');
    
  }));

  it('should load', inject(function($controller) {
    var ctrl = $controller('SSHKeysCtrl');
    expect(ctrl).toBeDefined();
  }));

});
 
