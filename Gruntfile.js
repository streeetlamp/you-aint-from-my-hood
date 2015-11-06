module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Grunt-sass 
        sass: {
          app: {
            files: [{
              expand: true,
              cwd: 'app/scss',
              src: ['*.scss'],
              dest: 'app/css',
              ext: '.css'
            }]
          },
          options: {
            sourceMap: false, 
            outputStyle: 'nested', 
          }
        },

        watch: {
            scss: {
              files: ['app/scss/**/*.scss'],
              tasks: ['sass']
            },
            css: {
                files: ['app/css/**/*.css']
            },
            js: {
                files: ['app/js/**/*.js','!app/js/main.js'],
                tasks: ['concat']
            },
            html: {
                files: ['app/include/**/*.html'],
                tasks: ['includes:dev']
            },
            livereload: {
                files: ['app/**/*.html', 'app/**/*.php', 'app/**/*.js', 'app/**/*.css'],
                options: { livereload: true }
            }
        },


        browserSync: {
            bsFiles: {
                src : 'app/css/style.css'
            },
            options: {
                watchTask: true, // < VERY important
                server: {
                    baseDir: "./app/"
                }
            }
        },


        autoprefixer: {
            dist: {
                files: {
                    'build/css/style.css' : 'app/css/style.css'
                }
            }
        },

        cmq: {
            your_target: { 
                files: {
                    'build/css/style.css' : 'build/css/style.css'
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'build/css/style.css': ['build/css/style.css']
                }
            }
        },

        jshint: {
            all: [
                'app/js/*.js'
            ],
            options: {
                jshintrc: 'app/js/.jshintrc'
            }
        },

        concat: {   
            scripts: {
                src: [
                    'app/js/scripts/libs/*.js', // All JS in the libs folder
                    'app/js/scripts/scripts.js'  // This specific file
                ],
                dest: 'app/js/main.js',
            }
        },

        uglify: {
            scripts: {
                src: 'app/js/main.js',
                dest: 'build/js/main.js'
            },
        },

        copy: {
          main: {
            expand: true,
            cwd: 'app/img/',
            src: '**',
            dest: 'build/img/',
          },
        },

        // Build the site using grunt-includes
        includes: {
          dev: {
            cwd: 'app/include',
            src: [ '*.html' ],
            dest: 'app/',
            options: {
              flatten: true,
              includePath: 'app/include/parts'
            }
          },
          build: {
            cwd: 'app/include',
            src: [ '*.html' ],
            dest: 'build/',
            options: {
              flatten: true,
              includePath: 'app/include/parts'
            }
          }
        },

        concurrent: {
            watch: {
                tasks: ['watch', 'browserSync'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

    });

    // 3. Where we tell Grunt we plan to use this plug-in.

    // Sass
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // JS
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // html
    grunt.loadNpmTasks('grunt-includes');

    // building of things
    grunt.loadNpmTasks('grunt-contrib-copy');
   
    // Browser Reload + File Watch
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('init', ['build']);

    // Run our devleoppment environment
    grunt.registerTask('dev', ['browserSync','watch']);

    // cleans directories, does everything for css, js, and images for deploy
    grunt.registerTask('build', ['includes', 'includes:build', 'sass', 'autoprefixer', 'cmq', 'cssmin', 'concat', 'uglify', 'copy']);
};
