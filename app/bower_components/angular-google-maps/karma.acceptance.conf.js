(function() {
  module.exports = function(config) {
    var ref, ref1;
    return config.set({
      basePath: './',
      frameworks: ['jasmine'],
      preprocessors: {
        'spec/**/**/*.coffee': ['coffee']
      },
      files: [
        'node_modules/phantomjs-polyfill/bind-polyfill.js', './tmp/acceptance/webpack.acceptance.js', 'bower_components/angular-mocks/angular-mocks.js', 'spec/coffee/bootstrap/bootstrap.coffee', 'spec/coffee/bootstrap/google-api-mock.coffee', 'spec/coffee/bootstrap/initiator.coffee', {
          pattern: '*coffee',
          included: false
        }, 'spec/coffee/**/*.spec.coffee'
      ],
      exclude: [],
      reporters: ['mocha', 'coverage'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: (ref = (ref1 = process.env.KARMA_BROWSERS) != null ? ref1.split(',') : void 0) != null ? ref : ['PhantomJS'],
      captureTimeout: 60000,
      singleRun: false,
      plugins: ['karma-mocha-reporter', 'karma-jasmine', 'karma-coverage', 'karma-chrome-launcher', 'karma-phantomjs-launcher', 'karma-coffee-preprocessor']
    });
  };

}).call(this);
