module.exports = function (grunt)
{

    // Track the time of each task
    require('time-grunt')(grunt);

    // Lazy Load
    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON('package.json'),
        uglify:
        {
            options:
            {
                banner: '/*!\n * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.homepage %>\n * <%= pkg.description %>\n * Contributor(s): <%= pkg.author %>\n */\n\n',
                report: 'min',
                 mangle: {
                    except: ['jQuery', 'ScrollAnimate']
                  }
            },
            build:
            {
                files:
                {
                    'scroll-animate.min.js': ['scroll-animate.js'],
                }
            }
        },
        jshint:
        {
            options:
            {
                jshintrc: true
            },
            default: ['scroll-animate.js']
        },
        jasmine:
        {
            build:
            {
                src: 'scroll-animate.js',
                options:
                {
                    specs: 'tests/specs/*Spec.js',
                    vendor: 'tests/vendor/*.js'
                }
            }
        },
        bump:
        {
            options:
            {
                files: ['package.json'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                createTag: true,
                tagName: '%VERSION%',
                tagMessage: 'Version %VERSION%',
                pushTo: 'origin',
                push: true
            }
        }
    });

    /*
	|--------------------------------------------------------------------------
	| Tasks
	|--------------------------------------------------------------------------
	|
	*/

    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['lint', 'jasmine']);

    grunt.registerTask('build', ['test', 'uglify']);
    grunt.registerTask('default', ['build']);
};