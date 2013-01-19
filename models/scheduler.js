
var EventEmitter = require('events').EventEmitter
  , jobs = require('../collections/jobs')
  , Job = require('./job')
  , CronJob = require('cron').CronJob
  , _ = require('underscore');

var currentJobs = [];

var scheduler = module.exports = new EventEmitter();

scheduler.initialize = function (done){

  jobs.getAll(function(err, jobList){
    if (err) return done(err);
    else done();

    for (var i=0; i< jobList.length; i++){
      create(jobList[i], false);
    }

  });
  
  return this;
};

scheduler.addJob = create;
scheduler.updateJob = update;
scheduler.removeJob = remove;

function create(jobConfig, runNow){
  
  var job = new Job(jobConfig);
  job
    .on('run', function(){
      jobs.changeState(this._id, 'running');
      scheduler.emit('run', this);
    })
    .on('done', function(){
      jobs.changeState(this._id, 'done');
      scheduler.emit('done', this);
    })
    .on('error', function(){
      jobs.changeState(this._id, 'error');
      scheduler.emit('error', this);
    });

  (function(job){
    
    var j = new CronJob({
      cronTime: jobConfig.cron,
      onTick: job.run,
      start: true,
      context: job
    });

    if(runNow)
      job.run();

    job.cronJob(j);

  })(job);

  currentJobs.push(job);
}

function update(jobConfig, runNow){
  remove(jobConfig._id);
  create(jobConfig, runNow);
}

function remove(jobId){
  var pos = -1;
  var job = _.find(currentJobs, function(job){
    pos++;
    return job._id === jobId;
  });

  if (job) {
    job.destroy();
    currentJobs.splice(pos, 1);
  }
}