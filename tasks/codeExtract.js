/*
 * grunt-code-extract
 * https://github.com/leornado/grunt-code-extract
 *
 * Copyright (c) 2020 leornado
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var path = require('path');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('codeExtract', 'Source code extract to file.', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      blocks: [{
        start: '/* code-extract-start */',
        end  : '/* code-extract-end */'
      }]
    });

    // Iterate over all specified file groups.
    var extracts = [], extractDest;
    this.files.forEach(function (f) {
      // Extract specified files.
      f.src.forEach(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return;
        }

        // Read file source.
        var newSrc = [];
        var origniSrc = grunt.file.read(filepath), src = origniSrc;

        options.blocks.forEach(function (block) {
          if (newSrc.length > 0) {
            src = newSrc.join('');
            newSrc = [];
          }

          while (true) {
            var startIdx = src.indexOf(block.start);
            var endIdx = src.indexOf(block.end);
            if (startIdx >= 0 && startIdx < endIdx && endIdx >= 0) {
              var prefix = src.substring(0, startIdx);
              newSrc.push(prefix);
              if (!!block.replace) {
                newSrc.push(typeof block.replace === 'function' ?
                  block.replace.apply(this, [filepath, f.dest, origniSrc, src, newSrc, extracts]) : block.replace);
              }
              extracts.push(src.substring(startIdx + block.start.length, endIdx));
              src = src.substr(endIdx + block.end.length);
            } else {
              if (newSrc.length > 0) {
                newSrc.push(src);
              }
              break;
            }
          }
        });

        grunt.file.write(f.dest, newSrc.length > 0 ? newSrc.join('') : origniSrc);
        grunt.log.writeln('File "' + f.dest + '" replaced.');
        extractDest = f.extractDest;
      });
    });

    // Write the extracted file.
    grunt.file.write(extractDest, extracts.join(''));
    grunt.log.writeln('File "' + extractDest + '" extracted.');
  });

};
