
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.jobList = (function($){
  var model = "jobs",
    container = '#job-list',
    timer;
 
  var events = {
    "click::tr": selectJob,
    "click::td a.remove": removeJob
  };

  function selectJob(e){
    apicaba.models.job.select(this.id);
  }

  function removeJob(e){
    var doit = confirm("The job and its resources is going to be deleted, sure?");
    if (doit) {
      var jobId = $(this).parents('tr').attr('id');
      apicaba.models.job.remove(jobId);
    }

    e.stopPropagation();
  }

  apicaba.utils.events.build(container, events);

  function render(jobs){
    clearInterval(timer);
    timer = setInterval(doit, 60000);

    function doit(){
      var rendered = apicaba.templates.jobList({ items: jobs });
      $('tr', container).remove();
      $(container).html(rendered);
    }

    doit();
  }

  apicaba.models.job.on('search', render);
  apicaba.models.job.on('bind', render);
  apicaba.models.job.on('change', render);

})(jQuery);



