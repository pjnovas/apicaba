var _ = require('underscore');

module.exports = function(grunt) {

  var hbsOpts = {
    namespace: 'apicaba.templates',
    wrapped: true,
    processName: function(filename) {
      return _.last(filename.split('/')).replace('.hbs', '');
    }
  };

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
      admin: {
        options: hbsOpts,
        files: {
          "client/apicaba/tmpls-admin.js": "client/apicaba/views/admin/templates/**/*.hbs"
        }
      },
      brand: {
        options: hbsOpts,
        files: {
          "client/apicaba/tmpls-brand.js": "client/apicaba/views/brand/templates/**/*.hbs"
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
      admin: {
        src: [
            '<banner:meta.banner>'
            ,'client/apicaba/tmpls-admin.js'
            ,'client/apicaba/API/*.js'
            ,'client/apicaba/utils/*.js'
            ,'client/apicaba/models/Model.js'
            ,'client/apicaba/models/*.js'
            ,'client/apicaba/views/admin/*.js'
            ,'client/apicaba/admin.js'
        ],
        dest: 'public/scripts/<%= pkg.name %>-<%= pkg.version %>-admin.js'
      },
      brand: {
        src: [
            '<banner:meta.banner>'
            ,'client/apicaba/tmpls-brand.js'
            ,'client/apicaba/API/*.js'
            ,'client/apicaba/utils/*.js'
            ,'client/apicaba/models/Model.js'
            ,'client/apicaba/models/*.js'
            ,'client/apicaba/views/splash/*.js'
            ,'client/apicaba/views/brand/*.js'
            ,'client/apicaba/views/explore/*.js'
            ,'client/apicaba/brand.js'
        ],
        dest: 'public/scripts/<%= pkg.name %>-<%= pkg.version %>-brand.js'
      }
    },
    min: {
      admin: {
        src: ['<banner:meta.banner>', '<config:concat.admin.dest>'],
        dest: 'public/scripts/<%= pkg.name %>-<%= pkg.version %>-admin.js'
      },
      brand: {
        src: ['<banner:meta.banner>', '<config:concat.brand.dest>'],
        dest: 'public/scripts/<%= pkg.name %>-<%= pkg.version %>-brand.js'
      }
    },
    watch: {
      files: [ 'public/css/*.less', 'client/apicaba/**/*'],
      tasks: 'default'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', 'handlebars concat');
  grunt.registerTask('admin', 'handlebars:admin concat:vendor concat:admin min:admin');
  grunt.registerTask('brand', 'handlebars:brand concat:vendor concat:brand min:brand');

};
