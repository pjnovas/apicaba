
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
      var rendered = apicaba.templates.jobSearch({});
      $(container).html(rendered);
    }
  }

})(jQuery);
