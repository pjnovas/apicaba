
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.jobEdit = (function($){
  var model = "jobs",
    container = '.job-form';
 
  var events = {
    "click::#save": function(e){ save(e, false); },
    "click::#save-run": function(e){ save(e, true); },
    "click::#cancel": cancel,
    "keyup::#name": showCanonical,
    "change::#group": showCanonical,
    "click::#get-preview": getPreview
  };

  function getPreview(){
    var job = buildJob();
    apicaba.models.resource.getPreview(job.source);
  }

  function save(e, runNow) {
    var job = buildJob();
    apicaba.models.job.save(job, { runNow: runNow });
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
      description: $('#description', container).val(),
      group: $('#group option:selected', container).attr('data-canonical'),
      cron: $('#cron', container).val(),
      source: {
        parser: $('#parser', container).val(),
        delimiter: $('#delimiter', container).val(),
        url: $('#url', container).val(),
        fields: apicaba.views.jobFields.getFields()
      }
    };

    if (!j._id) delete j._id;
    return j;
  }

  function render(job) {

    function selectGroup(){
      apicaba.models.group.removeListener('bind', selectGroup);
      apicaba.models.group.select(job.group, 'canonical');
    }

    var rendered = apicaba.templates.jobEdit(job || {});

    $('form', container).remove();
    $(container).html(rendered);

    $('body').scrollTop(0);
    $('#name', container).focus();

    if (job && job.group) {
      apicaba.models.group.on('bind', selectGroup);
      setTimeout(showCanonical,100);
    }

    apicaba.models.group.bind();
  }

  render();

  apicaba.models.job.on('select', render);

})(jQuery);



