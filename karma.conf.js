module.exports = function(config) {
  config.set({
    frameworks: ['browserify','jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/**/*.js',
      'test/**/*.js'
    ],
    preprocessors: {
        'app/**/*.js': ['browserify']
    },
    browsers : ['PhantomJS']
  });
}
