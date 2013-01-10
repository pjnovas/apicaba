/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: [
            '<banner:meta.banner>'
            ,'public/scripts/libs/**/*.js'
            ,'public/scripts/apicaba/API/*.js'
            ,'public/scripts/apicaba/utils/*.js'
            ,'public/scripts/apicaba/models/*.js'
            ,'public/scripts/apicaba/views/**/*.js'
            ,'public/scripts/apicaba/*.js'
        ],
        dest: 'public/scripts/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'public/scripts/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },
    watch: {
      files: 'public/scripts/**/*.js',
      tasks: 'concat'
    }
  });

  grunt.registerTask('default', 'concat');
  grunt.registerTask('package', 'concat min');

};
