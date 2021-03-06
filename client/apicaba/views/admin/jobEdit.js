
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.jobEdit = (function($){
  var model = "jobs",
    container = '.job-form';
 
  var events = {
    "click::#save": function(e){ save(e, false); },
    "click::#save-run": function(e){ save(e, true); },
    "click::#cancel": cancel,
    "keyup::#name": updateCanonical,
    "keyup::#canonical": updateUrl,
    "change::#group": updateUrl,
    "click::#get-preview": getPreview
  };

  function getPreview(){
    var job = buildJob();
    
    if ($.trim(job.source.url).length === 0)
      alert('URL is required');
    else 
      apicaba.models.resource.getPreview(job.source);
  }

  function save(e, runNow) {
    var job = buildJob();
    
    if ($.trim(job.name).length === 0 || $.trim(job.source.url).length === 0)
      alert('name & URL are required');
    else {
      apicaba.models.job.save(job, { runNow: runNow });
      render();
    }
  }

  function cancel() {
    render();
  }

  apicaba.utils.events.build(container, events);

  function updateCanonical(){
    var name = $('#name', container).val();

    name = name.toLowerCase().replace(/ /g, '-');
    $('#canonical').val(name);
    updateUrl();
  }

  function updateUrl(){
    var name = $('#canonical').val(),
      group = $('#group option:selected', container).attr('data-canonical');

    $('#access', container).text('/' + group + '/' + name);
  }

  function buildJob(){
    var j = {
      _id: $('#jobId', container).val(),
      name: $('#name', container).val(),
      canonical: $('#canonical', container).val(),
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
      updateUrl();
    }

    var rendered = apicaba.templates.jobEdit(job || {});

    $('form', container).remove();
    $(container).html(rendered);

    $('body').scrollTop(0);
    $('#name', container).focus();

    if (job && job.group) {
      apicaba.models.group.on('bind', selectGroup);
    }

    apicaba.models.group.bind();
  }

  render();

  apicaba.models.job.on('select', render);

})(jQuery);



