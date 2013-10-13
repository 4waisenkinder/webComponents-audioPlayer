'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: [
      'audioPlayer.css',
      '.sass-cache',
      'audioPlayer.min.js',
      'audioPlayer.temp.html'
    ],
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
    uglify: {
      minify: {
        options: {
          report: 'min'
        },
        files: {
          'audioPlayer.min.js': ['audioPlayer.js']
        }
      }
    },
    watch: {
      source: {
        files: ['audioPlayer.html', 'audioPlayer.scss', 'audioPlayer.js'],
        tasks: ['default'],
        options: {
          atBegin: true,
          spawn: false
        },
      },
    }
  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('htmlPrepare', function() {
    grunt.file.write('audioPlayer.temp.html', grunt.template.process(
      grunt.file.read('audioPlayer.html'),
      {data: {
        css: grunt.file.read('audioPlayer.css'),
        js: grunt.file.read('audioPlayer.min.js')
      }}
    ));
  });

  grunt.registerTask('default', [
    'compass',
    'uglify',
    'htmlPrepare',
    'htmlmin',
    'clean'
  ]);
};
