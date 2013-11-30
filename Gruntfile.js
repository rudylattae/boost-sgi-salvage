"use strict";

module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    require('time-grunt')(grunt);
    
    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= pkg.license %> */\n',

            distPackage: '<%= pkg.name %>.v<%= pkg.version %>.js',
            distPackageMin: '<%= pkg.name %>.v<%= pkg.version %>.min.js',
            distBookmarklet: 'bookmarklet-<%= pkg.name %>.v<%= pkg.version %>.js'
        },

        concat: {
            options: {
                separator: '\n\n',
                banner: '<%= meta.banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/{,*/}*.js', 'src/main.js', 'src/utils.js'],
                dest: 'dist/<%= meta.distPackage %>'
            }
        },

        uglify: {
            dist: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= meta.distPackageMin %>'
            },
            bkm: {
                options: {
                    mangle: {toplevel: true},
                    squeeze: {sequences: false, conditionals: false, hoist_vars: true},
                    codegen: {quote_keys: false}
                },
                src: 'src/bookmarklet.js',
                dest: 'build/<%= meta.distBookmarklet %>'
            }
        },

        js2uri: {
            'dist/<%= meta.distBookmarklet %>' : ['<%= uglify.bkm.dest %>']
        }
    });

    // Load other tasks
    grunt.loadNpmTasks('js2uri');

    // Tasks
    grunt.registerTask('default', ['concat', 'uglify', 'js2uri']);

};
