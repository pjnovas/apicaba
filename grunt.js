var _ = require('underscore');

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
    handlebars: {
      compile: {
        options: {
          namespace: 'apicaba.templates',
          wrapped: true,
          processName: function(filename) {
            return _.last(filename.split('/')).replace('.hbs', '');
          }
        },
        files: {
          "client/apicaba/templates.js": "client/apicaba/views/templates/**/*.hbs"
        }
      }
    },
    concat: {
      vendor: {
        src: [ 
          'client/vendor/jquery-1.9.0.min.js' 
          , 'client/vendor/**/*.js' 
        ],
        dest: 'public/scripts/vendor.js'
      },
      dist: {
        src: [
            '<banner:meta.banner>'
            ,'client/apicaba/templates.js'
            ,'client/apicaba/API/*.js'
            ,'client/apicaba/utils/*.js'
            ,'client/apicaba/models/Model.js'
            ,'client/apicaba/models/*.js'
            ,'client/apicaba/views/**/*.js'
            ,'client/apicaba/*.js'
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
      files: [ 'public/scripts/**/*.js', 'client/apicaba/**/*.js'],
      tasks: 'concat'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', 'handlebars concat');
  grunt.registerTask('package', 'handlebars concat min');

};
