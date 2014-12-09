/**
 * Asciify
 *
 * ---------------------------------------------------------------
 *
 * Create a fancy banner
 *
 * For usage docs see:
 *    https://github.com/olizilla/grunt-asciify
 */
module.exports = function(grunt) {

  grunt.config.set('asciify', {
    options: {
      font: 'cybersmall',
      log: false
    },
    title: {
      text: 'Scroll-Animate'
    }
  });

};
