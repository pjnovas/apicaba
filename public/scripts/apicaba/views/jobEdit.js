
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.jobEdit = (function($){
  var model = "jobs",
    container = '.job-form';
 
  var events = {
    "click::#save": save,
    "click::#cancel": cancel
  };

  function save() {
    //TODO: save
    render();
  }

  function cancel() {
    render();
  }

  apicaba.utils.events.build(container, events);

  function render(aJob, done) {
    var job = aJob || {};
    
    apicaba.utils.template.render(model, 'jobEdit', job, 
      function(err, rendered){
        $('form', container).remove();
        $(container).html(rendered);

        $('body').scrollTop(0);
        $('#name', container).focus();

        if (done) done();
    });
  }

  return {
    render: render
  };

})(jQuery);



