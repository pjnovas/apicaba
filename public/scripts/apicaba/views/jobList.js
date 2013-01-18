
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.jobList = (function($){
  var model = "jobs",
    container = '#job-list',
    timer;
 
  var events = {
    "click::tr": selectJob
  };

  function selectJob(e){
    apicaba.models.job.select(this.id);
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



