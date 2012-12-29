
var apicaba = apicaba || {};
apicaba.models = apicaba.models || {};

apicaba.models.job = (function(){
  var jobs = [],
    cache = [];

  return {
    search: function(keywords){
      cache = [];

      if(keywords === ''){
        cache = jobs;
      }
      else {
        for(var i=0; i < jobs.length; i++){
          for(var prop in jobs[i]){
            if( (new RegExp(keywords, 'ig').test(jobs[i][prop]) )){
              cache.push(jobs[i]);
              break;
            }
          }
        }
      }

      apicaba.views.jobList.render();
    },

    bind: function(done){
      apicaba.api.job.getAll(function(err, _jobs){
        jobs = _jobs;
        cache = _jobs;
        apicaba.views.jobList.render(done);
      });
    },

    add: function(job, runNow) {
      apicaba.api.job.new(job, runNow, function(err, newjob){
        jobs.unshift(newjob);
        apicaba.views.jobList.render();
        apicaba.views.jobEdit.render(job);
      });
    },

    update: function(job, runNow) {

      for(var i = 0; i < cache.length; i++){
        if (cache[i]._id === job._id){
          cache[i] = _.clone(job);
          break;
        }
      }

      for(var i = 0; i < jobs.length; i++){
        if (jobs[i]._id === job._id){
          jobs[i] = _.clone(job);
          break;
        }
      }

      apicaba.api.job.update(job, function(err){
        //TODO: if something bad happened, update the job 
        // back again and re-render
      });

      apicaba.views.jobList.render();
      apicaba.views.jobEdit.render(job);
    },

    save: function(job, runNow){
      if (job._id) this.update(job, runNow);
      else this.add(job, runNow);
    },

    remove: function(id) {
      for(var i = 0; i < cache.length; i++){
        if (cache[i]._id === id){
          cache.splice(i, 1);
          break;
        }
      }

      for(var i = 0; i < jobs.length; i++){
        if (jobs[i]._id === id){
          jobs.slice(i, i);
          break;
        }
      }

      apicaba.api.job.delete(id, function(err){
        //TODO: if something bad happened, put the job 
        // back again and re-render
      });

      apicaba.views.job.render();
    },

    selectJob: function(id){
      for(var i = 0; i < jobs.length; i++){
        if (jobs[i]._id === id){
          apicaba.views.jobEdit.render(jobs[i], function(){
            var group = apicaba.models.group.getByCanonical(jobs[i].group);
            apicaba.models.group.selectGroup(group._id);
          });
          return;
        }
      }
    },

    getJobs: function(){
      return cache;
    },

    getRealJobs: function(){
      return jobs;
    }
  };

})();

