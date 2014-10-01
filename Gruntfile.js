module.exports = function (grunt)
{
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
        jsvalidate: {
            options:
            {
                globals: {},
                esprimaOptions: {},
                verbose: false
            },
            build:
            {
                files:
                {
                    src: ['scroll-animate.js']
                }
            }
        },
        watch: {
            karma: {
                files: ['scroll-animate.js', 'tests/specs/**/*.js'],
                tasks: ['karma:watch:run']
            }
        },
        karma: {
            options:
            {
                configFile: 'tests/karma.conf.js',
                separator: '',
                preprocessors: {
                    'scroll-animate.js': 'coverage'
                },
            },
            build:
            {
                options:
                {
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    logLevel: 'INFO'
                }
            },
            watch:
            {
                options:
                {
                    background: true,
                    browsers: ['PhantomJS'],
                    logLevel: 'ERROR',
                    reporters: ['dots', 'coverage']
                }
            },
            all:
            {
                options:
                {
                    singleRun: true,
                    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],
                    logLevel: 'INFO'
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

    grunt.registerTask('lint', ['jshint', 'jsvalidate']);
    grunt.registerTask('test', ['lint', 'karma:build']);

    grunt.registerTask('build', ['test', 'uglify']);
    grunt.registerTask('default', ['karma:watch:start', 'watch']);
};