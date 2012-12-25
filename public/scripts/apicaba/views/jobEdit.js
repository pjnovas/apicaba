
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.jobEdit = (function($){
  var model = "jobs",
    container = '.job-form';
 
  var events = {
    "click::#save": save,
    "click::#cancel": cancel,
    "keyup::#name": showCanonical
  };

  function save() {
    var job = buildJob();
    apicaba.models.save(job);

    render();
  }

  function cancel() {
    render();
  }

  apicaba.utils.events.build(container, events);

  function showCanonical(){
    var name = $('#name', container).val(),
      group = $('#group', container).val();

    name = name.toLowerCase().replace(/ /g, '-');
    $('#access', container).text('/' + group + '/' + name);
  }

  function buildJob(){
    return {
      _id: $('#jobId', container).val(),
      name: $('#name', container).val(),
      group: $('#group', container).val(),
      cron: $('#cron', container).val(),
      parser: $('#parser', container).val(),
      url: $('#url', container).text()
    };
  }

  function render(aJob, done) {
    var job = aJob || {};
    
    apicaba.utils.template.render(model, 'jobEdit', job, 
      function(err, rendered){
        $('form', container).remove();
        $(container).html(rendered);

        $('body').scrollTop(0);
        $('#name', container).focus();

        apicaba.models.group.bind();

        if (done) done();
    });
  }

  return {
    render: render
  };

})(jQuery);



