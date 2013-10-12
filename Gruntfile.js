'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      compile: {
        options: {
          cssDir: '.',
          environment: 'production',
          sassDir: '.'
        }
      }
    },
    watch: {
      source: {
        files: ['index.jade', 'style.less'],
        tasks: ['default'],
        options: {
          atBegin: true,
          spawn: false
        },
      },
    }
  });


  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['compass']);
};
