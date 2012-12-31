
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

  return {
    render: function(fields, done) {
      apicaba.utils.template.render(model, 'jobFields', { items: fields }, 
        function(err, rendered){
          spinner.stop();
          $('#show-preview').show();

          $(container).empty().html(rendered);
          if (done) done();
      });
    },
    loading: function(){
      $('#show-preview').hide();
      var target = $(container)[0];
      spinner.spin(target);
    }
  };

})(jQuery);



