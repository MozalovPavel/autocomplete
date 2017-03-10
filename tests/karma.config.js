'use strict';
module.exports = function(config) {

  config.set({
    autoWatch: true,
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
        // 'app/bower_components/**/*.js',
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-animate/angular-animate.js',
        'app/bower_components/angular-route/angular-route.js',
        'app/bower_components/jquery/dist/jquery.js',
        'app/bower_components/jQuery.tabbable/jquery.tabbable.js',
        'app/bower_components/jScrollPane/script/jquery.jscrollpane.js',
        'app/bower_components/jScrollPane/script/jquery.mousewheel.js',
        'app/bower_components/angular-mocks/angular-mocks.js',

        'app/js/**/*.js',
        'tests/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    browsers: [
    //   'Chrome'
        'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
    //   'karma-chrome-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO
  });
};
