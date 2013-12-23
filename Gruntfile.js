"use strict";

module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // require('time-grunt')(grunt);
    
    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= pkg.license %> */\n',
            packageHeader: '(function(name, root){\n',
            packageFooter: '\nreturn api; \n})("boostSgiSalvage", window);',

            distPackage: '<%= pkg.name %>.v<%= pkg.version %>.js',
            distPackageMin: '<%= pkg.name %>.v<%= pkg.version %>.min.js',
            distBookmarklet: 'bookmarklet-<%= pkg.name %>.v<%= pkg.version %>.js'
        },

        bower_concat: {
            dist: {
                exclude: ['jquery', 'es5-shim', 'jasmine-jquery'],
                dest: 'build/bower_components.js'
            }
        },

        concat: {
            options: {
                separator: '\n\n',
                banner: '<%= meta.banner %><%= meta.packageHeader %>',
                footer: '<%= meta.packageFooter %>',
                stripBanners: true
            },
            dist: {
                src: [
                    //'lib/{,*/}*.js', 
                    '<%= bower_concat.dist.dest %>', 
                    'src/core.js', 
                    'src/utils.js', 
                    'src/models.js', 
                    'src/features/photosAndStars.js', 
                    'src/main.js', 
                    'src/api.js'
                ],
                dest: 'dist/<%= meta.distPackage %>'
            }
        },

        uglify: {
            dist: {
                options: {
                    preserveComments: 'some',
                    report: 'min'
                },
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= meta.distPackageMin %>'
            },
            bkm: {
                options: {
                    mangle: {toplevel: true},
                    squeeze: {sequences: false, conditionals: false, hoist_vars: true},
                    codegen: {quote_keys: false},
                    report: 'min'
                },
                src: 'src/bookmarklet.js',
                dest: 'build/<%= meta.distBookmarklet %>'
            }
        },

        copy: {
            templates: {
                files: [ {'dist/templates.html': 'src/features/templates.html'} ]
            }
        },

        js2uri: {
            'dist/<%= meta.distBookmarklet %>' : ['<%= uglify.bkm.dest %>']
        },

        harp: {
            server: {
                server: true,
                source: 'docs'
            },
            dist: {
                source: 'docs',
                dest: '_gh-pages'
            }
        },

        watch: {
            options: { 
                nonull: true
            },
            files: ['Gruntfile.js', 'src/*.js'],
            tasks: ['default'],
        }
    });

    // Load other tasks
    grunt.loadNpmTasks('js2uri');

    // Tasks
    grunt.registerTask('default', ['bower_concat', 'concat', 'uglify', 'copy', 'js2uri']);
    grunt.registerTask('devcycle', ['default', 'watch']);

};
