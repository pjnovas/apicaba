
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.jobList = (function($){
  var model = "jobs",
    container = '#job-list';
 
  var events = {
    "click::tr": selectJob
  };

  function selectJob(e){
    apicaba.models.job.selectJob(this.id);
  }

  apicaba.utils.events.build(container, events);

  var timer;

  function render(jobs){
    clearInterval(timer);

    timer = setInterval(function(){

      apicaba.utils.template.render(model, 'jobList', { items: jobs }, 
        function(err, rendered){
          $('tr', container).remove();
          $(container).html(rendered);
      });

    }, 60000);
  }

  apicaba.models.job.on('change', render);
  apicaba.models.job.on('search', render);

})(jQuery);



