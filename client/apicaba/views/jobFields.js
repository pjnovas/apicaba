
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.jobFields = (function($){
  var model = "jobs",
    container = '#fields';
 
  var events = {
    
  };

  apicaba.utils.events.build(container, events);

  var opts = {
    lines: 7,
    length: 0,
    width: 20,
    radius: 26,
    corners: 0.5,
    rotate: 39,
    color: '#000',
    speed: 1.2,
    trail: 57,
    shadow: false,
    hwaccel: false,
    className: 'spinner',
    zIndex: 2e9,
    top: 'auto',
    left: 'auto'
  };

  var spinner = new Spinner(opts);

  function getField(){
    var value = $('input', this).val(),
      placeHolder = $('input', this).attr('placeholder');

    var field = {
      name: value || placeHolder,
      type: $('select', this).val()
    };

    return field;
  }

  Handlebars.registerHelper('formatFieldName', function(name) {
    var newName = name;

    newName = newName.replace(/ /, '_');
    newName = newName.toLowerCase();

    return newName;
  });

  function render(fields) {
    var rendered = apicaba.templates.jobField({ items: fields });
    spinner.stop();
    if (fields && fields.length > 0) {
      $('#show-preview').show();
      $(container).empty().html(rendered);
    }
  }

  apicaba.models.job.on('select', function(job){
    setTimeout(function(){
      if (job && job.source && job.source.fields){
        render(job.source.fields);
      }
    }, 1000);
  });

  return {
    render: render,
    loading: function(){
      $('#show-preview').hide();
      $(container).empty();
      var target = $(container)[0];
      spinner.spin(target);
    },
    getFields: function(){
      var fields = [];

      $('div div', container).each(function(){
        fields.push(getField.call(this));
      });

      return fields;
    }
  };

})(jQuery);



