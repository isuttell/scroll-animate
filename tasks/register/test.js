/**
 * CMD: grunt test
 *
 * ---------------------------------------------------------------
 *
 * Runs unit tests and `grunt hint`
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('test', [
    'karma:single',
    'jshint:src',
    'flow:src',
    'jscs:src'
  ]);
};
