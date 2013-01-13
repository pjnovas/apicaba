
var apicaba = apicaba || {};
apicaba.models = apicaba.models || {};

apicaba.models.job = (function(){
  var jobs = [],
    exports = new EventEmitter();

  function add(job, runNow) {
    apicaba.api.job.new(job, runNow, function(err, newjob){
      if(err) return;

      if (runNow) {
        newjob.state = 'running';
        newjob.lastRun = new Date();
      }

      jobs.unshift(newjob);

      exports.emit('add', newjob);
      exports.emit('change', jobs);
    });
  }

  function update(job, runNow) {

    apicaba.api.job.update(job, runNow, function(err){
      if(err) return;

      if (runNow) {
        job.state = 'running';
        job.lastRun = new Date();
      }

      for(var i = 0; i < jobs.length; i++){
        if (jobs[i]._id === job._id){
          jobs[i] = _.clone(job);
          break;
        }
      }

      exports.emit('update', job);
      exports.emit('change', jobs);
    });
  }

  exports.search = function(keywords){
    var cache = [];

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

    exports.emit('search', cache);

    return this;
  };

  exports.bind = function(){

    apicaba.api.job.getAll(function(err, _jobs){
      jobs = _jobs;
      
      exports.emit('bind', jobs);
      exports.emit('change', jobs);
    });

    return this;
  };

  exports.save = function(job, runNow){
    if (job._id) update(job, runNow);
    else add(job, runNow);

    return this;
  };

  exports.remove = function(id) {

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

    //apicaba.views.job.render();
    return this;
  };

  exports.selectJob = function(id){
    for(var i = 0; i < jobs.length; i++){
      if (jobs[i]._id === id){

        exports.emit('select', jobs[i]);
        
        /*
        var group = apicaba.models.group.getByCanonical(jobs[i].group);
        apicaba.models.group.selectGroup(group._id);
        */
        break;
      }
    }

    return this;
  };

  exports.changeStatus = function(data){
    
    for(var i = 0; i < jobs.length; i++){
      if (jobs[i]._id === data._id){
        jobs[i].state = data.state;
        if (data.state === 'running')
          jobs[i].lastRun = new Date();
        break;
      }
    }

    exports.emit('change', jobs);

    return this;
  };

  return exports;
})();

