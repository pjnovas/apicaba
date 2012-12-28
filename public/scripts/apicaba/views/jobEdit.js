
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.jobEdit = (function($){
  var model = "jobs",
    container = '.job-form';
 
  var events = {
    "click::#save": save,
    "click::#cancel": cancel,
    "keyup::#name": showCanonical,
    "change::#group": showCanonical
  };

  function save() {
    var job = buildJob();
    apicaba.models.job.save(job);

    render();
  }

  function cancel() {
    render();
  }

  apicaba.utils.events.build(container, events);

  function showCanonical(){
    var name = $('#name', container).val(),
      group = $('#group option:selected', container).attr('data-canonical');

    name = name.toLowerCase().replace(/ /g, '-');
    $('#access', container).text('/' + group + '/' + name);
  }

  function buildJob(){
    var j = {
      _id: $('#jobId', container).val(),
      name: $('#name', container).val(),
      group: $('#group', container).val(),
      cron: $('#cron', container).val(),
      source: {
        parser: $('#parser', container).val(),
        url: $('#url', container).val()
      }
    };

    if (!j._id) delete j._id;
    return j;
  }

  function render(aJob, done) {
    var job = aJob || {};
    
    apicaba.utils.template.render(model, 'jobEdit', job, 
      function(err, rendered){
        $('form', container).remove();
        $(container).html(rendered);

        $('body').scrollTop(0);
        $('#name', container).focus();

        apicaba.views.groupEdit.render(null, function(){
          apicaba.models.group.bind();
        });

        if (done) done();
    });
  }

  return {
    render: render
  };

})(jQuery);



