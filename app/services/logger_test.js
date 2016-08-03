'use strict';

describe('bigdata.services.logger', function() {

  beforeEach(module('bigdata.services.logger'));

  var mylogger, nglog;

  beforeEach(inject(function(logger, $log) {
    mylogger = logger;
    nglog = $log;
  }));

  it('should log a info message', function() {
    var msg = 'Test message';
    var result = mylogger.info(msg);
    var expected = nglog.info(msg);
    expect(result).toEqual(expected); 
  });

  afterEach(function() {
  });

});

