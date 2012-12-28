
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

  return {
    render: function(done) {
      var jobs = apicaba.models.job.getJobs();

      apicaba.utils.template.render(model, 'jobList', { items: jobs }, 
        function(err, rendered){
          $('tr', container).remove();
          $(container).html(rendered);
          if (done) done();
      });
    }
  };

})(jQuery);



