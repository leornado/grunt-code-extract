/*
 * grunt-code-extract
 * https://github.com/Administrator/grunt-code-extract
 *
 * Copyright (c) 2020 leornado
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all    : [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc      : '.jshintrc',
        reporterOutput: ''
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    codeExtract: {
      jsExample1: {
        options: {
          blocks: [
            {start: '/* code-extract-start */', end: '/* code-extract-end */', replace: '"a"'},
            {
              start  : '/* start */', end: '/* end */',
              replace: function (block, srcFilepath, replacedSrcPath, origniSrc,
                currentDealedPartialSrc, currentDealedRemainedSrcArray, extractedSrcArray) {
                return '//sdf';
              }
            }
          ]
        },
        files  : [{
          expand        : true, flatten: true,
          src           : ['test/source*.js'], dest: 'tmp/',
          replace       : function (block, srcFilepath) {
            return block.replace === '"a"' ? '"A"' : '//' + srcFilepath;
          }, extractDest: 'tmp/extract.json'
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'codeExtract'/*, 'nodeunit'*/]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
