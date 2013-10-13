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
    htmlmin: {
      minify: {
        options: {
          collapseWhitespace: true,
          removeComments: true
        },
        files: {
          'audioPlayer.min.html': 'audioPlayer.temp.html'
        }
      }
    },
    watch: {
      source: {
        files: ['audioPlayer.html', 'audioPlayer.scss'],
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

  grunt.registerTask('htmlPrepare', function() {
    grunt.file.write('audioPlayer.temp.html', grunt.template.process(
      grunt.file.read('audioPlayer.html'),
      {data: {css: grunt.file.read('audioPlayer.css')}}
    ));
  });
  grunt.registerTask('clean', function() {
    grunt.file.delete('audioPlayer.css');
    grunt.file.delete('.sass-cache');
    grunt.file.delete('audioPlayer.temp.html');
  });
  grunt.registerTask('default', ['compass', 'htmlPrepare', 'htmlmin', 'clean']);
};
