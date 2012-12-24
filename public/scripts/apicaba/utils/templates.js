
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
    var id = Mustache.render(tmplId, {name: name});
    var tmpl = $.trim($(id).html());
    return Mustache.render(tmpl, data);
  }

  var render = function(model, name, data, done){

    if (model in loaded) {
      return done(null, resolve(name, data));
    }
    
    loaded[model] = {
      file: Mustache.render(partials, {model: model})
    };

    insertTemplate(model, function(err){
      if (err) {
        delete loaded[model];
        return done(err);
      }

      done(null, resolve(name, data));
    });
  };


  return {
    render: render
  };


})(jQuery);



