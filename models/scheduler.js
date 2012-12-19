
var events = require('events')
  , fs = require('fs')
  , Job = require('./job')
  , CronJob = require('cron').CronJob
  , appConfig;

var emitter = new events.EventEmitter();
var jobs = [];

function initialize(configs, _appConfig, done){
  appConfig = _appConfig;
  fs.readdir(configs, function(err, files){

    for(var i=0; i<files.length; i++) {
      createJob(configs + '/' + files[i]);
    }

    if (done) done();
  });
  
  return this;
}

function createJob(fileName){
  var cfg = require(fileName);
  
  var job = new Job(cfg, appConfig);
  job
    .on('run', function(){
      emitter.emit('run', this);
    })
    .on('done', function(){
      emitter.emit('done', this);
    });

  (function(job){
    
    var j = new CronJob({
      cronTime: cfg.cron,
      onTick: function(){
        job.run();
      },
      start: true
    });

  })(job);

  jobs.push(job);
}

var scheduler = module.exports = emitter;

scheduler.initialize = initialize;
scheduler.getJobs = function(){
  return jobs;
};