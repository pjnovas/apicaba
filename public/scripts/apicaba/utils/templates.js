
var apicaba = apicaba || {};
apicaba.utils = apicaba.utils || {};

apicaba.utils.template = (function($){
  var partials = '/partials/_{{{model}}}.html',
    tmplId = '#{{{name}}}-tmpl',
    loaded = {};

  var insertTemplate = function(model, done){
    $.get(loaded[model].file, function(templates){
      $('body').append(templates);
      done(null);
    });
  };

  function resolve(name, data) {
    var id = Handlebars.compile(tmplId)({name: name});
    var tmpl = $.trim($(id).html());
    return Handlebars.compile(tmpl)(data);
  }

  var render = function(model, name, data, done){

    if (model in loaded) {
      return done(null, resolve(name, data));
    }
    
    loaded[model] = {
      file: Handlebars.compile(partials)({model: model})
    };

    insertTemplate(model, function(err){
      if (err) {
        delete loaded[model];
        return done(err);
      }

      done(null, resolve(name, data));
    });
  };

  Handlebars.registerHelper('timeAgo', function(date) {
    if (date && moment(date).isValid())
      return moment(date).fromNow();
    else 
      return "-";
  });

  Handlebars.registerHelper('formatDate', function(date) {
    if (date && moment(date).isValid())
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    else 
      return "-";
  });

  return {
    render: render
  };


})(jQuery);



