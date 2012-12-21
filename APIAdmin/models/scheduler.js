
var EventEmitter = require('events').EventEmitter
  , jobs = require('../../collections/jobs')
  , Job = require('./job')
  , CronJob = require('cron').CronJob;

var currentJobs = [];

var scheduler = module.exports = new EventEmitter();

scheduler.initialize = function (done){

  jobs.getAll(function(err, jobList){
    if (err) return done(err);
    else done();

    for (var i=0; i< jobList.length; i++){
      create(jobList[i], true);
    }

  });
  
  return this;
};

function create(jobConfig, runNow){
  
  var job = new Job(jobConfig);
  job
    .on('run', function(){
      scheduler.emit('run', this);
    })
    .on('done', function(){
      scheduler.emit('done', this);
    });

  (function(job){
    
    var j = new CronJob({
      cronTime: jobConfig.cron,
      onTick: function(){
        job.run();
      },
      start: runNow
    });

  })(job);

  currentJobs.push(job);
}