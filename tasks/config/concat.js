/**
 * Concat
 *
 * ---------------------------------------------------------------
 *
 * # Concat multiple files together
 *
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.config.set('concat', {
    options: {
      banner: '/*!\n<%= asciify_title %> ' + pkg.name + ' ' + pkg.version + ' <' + pkg.homepage + '>\n' +
      ' Contributor(s): ' + pkg.contributors + '\n Last Build: ' + grunt.template.today('yyyy-mm-dd') +
      '\n Do not edit this file. It is created from the src/ folder.\n*/\n'
    },
    src: {
      options: {
        stripBanners: true,
        footer: '  return ScrollAnimate;\n});',
      },
      files: {
        // These need to be defined roughly in this order
        'scroll-animate.js' : [
          'src/lib/amd.js',
          'src/lib/polyfills.js',
          'src/utilities.js',
          'src/ease.js',
          'src/scroll-tween.js',
          'src/scroll-animate.js'
        ]
      }
    }
  });

};