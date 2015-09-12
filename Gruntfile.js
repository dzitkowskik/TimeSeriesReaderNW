module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            libs: {
                src: ['app/js/jquery.min.js', 'app/js/highstock.js'],
                dest: 'dist/libs.js'
            },
            myScripts: {
                src: ['app/js/scripts.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        copy: {
            main: {
                expand: true,
                dot: true,
                cwd: 'app/assets/',
                src: '**',
                dest: 'dist/'
            },
            packageinfo: {
                src: 'app/assets/package.json',
                dest: 'dist-pkg/package.json'
            }
        },
        cssmin: {
            target: {
                files: {
                    'dist/<%= pkg.name %>.css': ['app/css/pure-min.css', 'app/css/circle.css', 'dist/styles.css']
                }
            }
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    },
                    pretty: true
                },
                files: {
                    'dist/index.html': 'app/index.jade'
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app/js/scripts.js'],
            options: {
                globals: {
                    console: true,
                    document: true
                }
            }
        },
        nodewebkit: {
            options: {
                version: '0.8.3',
                build_dir: './dist-pkg',
                mac: true,
                win: true,
                linux32: true,
                linux64: true
            },
            src: ['dist/**/*']
        },
        stylus: {
            compile: {
                files: {
                    'dist/styles.css': ['app/css/styles.styl']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.libs.dest %>', '<%= concat.myScripts.dest %>']
                }
            }
        },
        watch: {
            stylus: {
                files: ['app/**/*.styl'],
                tasks: ['stylus', 'cssmin']
            },
            jade: {
                files: ['app/**/*.jade'],
                tasks: 'jade'
            },
            js: {
                files: ['app/js/scripts.js'],
                tasks: ['jshint', 'concat', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['copy', 'stylus', 'cssmin', 'jade', 'jshint', 'concat', 'uglify', 'nodewebkit']);
    grunt.registerTask('dev', ['copy', 'stylus', 'cssmin', 'jade', 'jshint', 'concat']);
};
