
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.jobSearch = (function($){
  var model = "jobs",
    container = '.search';
 
  var events = {
    'keyup::input': search
  };

  apicaba.utils.events.build(container, events);

  function search(){
    apicaba.models.job.search($('input', container).val());
  }

  return {
    render: function() {
      apicaba.utils.template.render(model, 'search', {}, 
        function(err, rendered){
          $(container).html(rendered);
      });
    }
  }

})(jQuery);
