(function() {
  var _, argv, coffeelint, kickoff, log, watch;

  log = require('util').log;

  _ = require('lodash');

  kickoff = require('karma-kickoff');

  argv = require('yargs').argv;

  coffeelint = require('./grunt/coffeelint');

  watch = require('./grunt/options/watch');

  module.exports = function(grunt) {
    var allExamples, allExamplesOpen, allExamplesTaskToRun, coffeeLints, coffeeLintsThrow, dev, exampleOpenTasks, lints, listWithQuotes, options, showOpenType;
    require('./grunt/bower')(grunt);
    ["grunt-contrib-uglify", "grunt-contrib-jshint", "grunt-contrib-concat", "grunt-contrib-clean", "grunt-contrib-connect", "grunt-contrib-copy", "grunt-contrib-watch", "grunt-open", "grunt-mkdir", "grunt-contrib-coffee", "grunt-conventional-changelog", "grunt-bump", 'grunt-replace', 'grunt-subgrunt', 'grunt-debug-task', 'grunt-verbosity', 'grunt-webpack', 'grunt-angular-architecture-graph', 'grunt-ng-annotate'].forEach(function(gruntLib) {
      return grunt.loadNpmTasks(gruntLib);
    });
    options = require('./grunt/options')(grunt);
    allExamples = grunt.file.expand('example/*.html');
    allExamplesOpen = {};
    allExamples.forEach(function(path) {
      var pathValue, root;
      root = path.replace('example/', '').replace('.html', '');
      pathValue = "http://localhost:3100/" + path;
      return allExamplesOpen[root] = {
        path: pathValue
      };
    });
    showOpenType = function(toIterate) {
      if (toIterate == null) {
        toIterate = allExamplesOpen;
      }
      return _(toIterate).each(function(v, k) {
        return log(k + " -> " + v.path);
      });
    };
    options.open = _.extend(options.open, allExamplesOpen);
    grunt.initConfig(options);
    lints = _.keys(_.omit(watch.coffeelint, 'options'));
    coffeeLints = lints.map(function(n) {
      return "coffeelint:" + n;
    });
    coffeeLintsThrow = lints.map(function(n) {
      return "coffeelint:" + n + ":throw";
    });
    lints.forEach(function(n) {
      grunt.registerTask("coffeelint:" + n, function() {
        return coffeelint({
          src: watch.coffeelint[n].files,
          doThrow: false
        }, this.async());
      });
      return grunt.registerTask("coffeelint:" + n + ":throw", function() {
        return coffeelint({
          src: watch.coffeelint[n].files
        }, this.async());
      });
    });
    grunt.registerTask('lint', coffeeLints);
    grunt.registerTask('lintWatch', lints.map(function(n) {
      return "watch:coffeelint-" + n;
    }));
    grunt.registerTask('build', coffeeLintsThrow.concat(['bower', 'clean:dist', 'jshint', 'mkdir', 'lint', 'coffee', 'ngAnnotate', 'concat:libs', 'replace', 'webpack:commonjsDeps']));
    grunt.registerTask('buildDist', ['build', 'concat:dist']);
    grunt.registerTask("default", ['verbosity', 'buildDist', 'copy', 'uglify:dist', 'uglify:streetview', 'karma']);
    grunt.registerTask("buildAll", ["build", "concat", "uglify", "copy", "karma", "graph"]);
    grunt.registerTask("spec", ['verbosity', "buildDist", "copy", "karma", "open:jasmine", "watch:spec"]);
    grunt.registerTask("coverage", ['connect:coverage', 'open:coverage', "watch:spec"]);
    grunt.registerTask('default-no-specs', ["clean:dist", "jshint", "mkdir", "coffee", "concat:libs", "replace", "concat:dist", "copy", "uglify:dist"]);
    grunt.registerTask('offline', ['default-no-specs', 'watch:offline']);
    dev = ["clean:dist", "jshint", "mkdir", "coffee", "concat:libs", "replace", "webpack:commonjsDeps", "concat", "copy"];
    grunt.registerTask("dev", dev.concat(["uglify:distMapped", "uglify:streetviewMapped", "karma"]));
    grunt.registerTask("fast", dev.concat(["karma"]));
    grunt.registerTask("build-street-view", ['clean:streetview', 'mkdir', 'coffee', 'concat:libs', 'replace', 'concat:streetview', 'concat:streetviewMapped', 'uglify:streetview', 'uglify:streetviewMapped']);
    grunt.registerTask('graph', ['angular_architecture_graph']);
    grunt.registerTask('bump-@-preminor', ['changelog', 'bump-only:preminor', 'buildAll', 'bump-commit']);
    grunt.registerTask('bump-@-prerelease', ['changelog', 'bump-only:prerelease', 'buildAll', 'bump-commit']);
    grunt.registerTask('bump-@', ['changelog', 'bump-only', 'buildAll', 'bump-commit']);
    grunt.registerTask('bump-@-minor', ['changelog', 'bump-only:minor', 'buildAll', 'bump-commit']);
    grunt.registerTask('bump-@-major', ['changelog', 'bump-only:major', 'buildAll', 'bump-commit']);
    exampleOpenTasks = [];
    _.each(allExamplesOpen, function(v, key) {
      var basicTask;
      basicTask = "open:" + key;
      grunt.registerTask(key, ["fast", "clean:example", "connect:server", basicTask, "watch:all"]);
      return exampleOpenTasks.push(basicTask);
    });
    allExamplesTaskToRun = ["fast", "clean:example", "connect:server"].concat(exampleOpenTasks).concat(['watch:all']);
    listWithQuotes = function(collection, doLog) {
      var all, last;
      if (doLog == null) {
        doLog = true;
      }
      last = collection.length - 1;
      all = '';
      collection.forEach(function(t, i) {
        return all += i < last ? "'" + t + "'," : "'" + t + "'";
      });
      if (doLog) {
        return log(all);
      }
      return all;
    };
    grunt.registerTask('listExamples', showOpenType);
    grunt.registerTask('listAllOpen', function() {
      return showOpenType(options.open);
    });
    grunt.registerTask('listAllExamplesTasks', function() {
      return listWithQuotes(exampleOpenTasks);
    });
    grunt.registerTask('allExamples', allExamplesTaskToRun);
    grunt.registerTask('server', ["connect:server", "watch:all"]);
    grunt.registerTask('s', 'server');
    grunt.registerTask('karma', 'karma runner', function() {
      return kickoff(this.async(), {
        logFn: grunt.log.oklns,
        configFile: require.resolve('./karma.conf.coffee')
      });
    });
    grunt.registerTask('karma:acceptance', 'karma runner', function() {
      return kickoff(this.async(), {
        logFn: grunt.log.oklns,
        configFile: require.resolve('./karma.acceptance.conf.coffee')
      });
    });
    grunt.registerTask('karmaSpecific', 'karma runner', function() {
      return kickoff(this.async(), {
        configFile: require.resolve('./karma.conf.coffee'),
        logFn: grunt.log.oklns,
        appendFiles: argv.files.split(','),
        lengthToPop: 1,
        reporters: ['mocha']
      });
    });
    grunt.registerTask('buildSpecFile', ['buildDist', 'karmaSpecific']);
    return grunt.registerTask('buildSpec', ['buildDist', 'karma']);
  };

}).call(this);
