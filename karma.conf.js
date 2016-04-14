module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'app/components/**/*.js',
      'app/dashboard/**/*.js',
      'app/multinode_services/**/*.js',
      'app/cloud_services/**/*.js',
      //'app/launcher/**/*.js',
      //'app/settings/**/*.js',
      'app/login/**/*.js',
      'app/help/**/*.js' //,
      //'app/sshkeys/**/*.js',
      //'app/firewall/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    // Currently available browsers:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers : ['Firefox'],
    //browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
